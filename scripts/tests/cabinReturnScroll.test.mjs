import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const astroRequire = createRequire(require.resolve('astro/package.json'));
const { transformWithEsbuild } = await import(pathToFileURL(astroRequire.resolve('vite')).href);

const layout = readFileSync(new URL('../../src/layouts/Layout.astro', import.meta.url), 'utf8');
const { code: script } = await transformWithEsbuild(
  layout.match(/<script>\s*([\s\S]*?)<\/script>/)[1],
  'cabin-return.ts',
  { loader: 'ts' },
);

function setup() {
  const documentEvents = new Map();
  const windowEvents = new Map();
  const scrolls = [];
  const timers = [];
  const style = {
    value: '', priority: '',
    getPropertyValue() { return this.value; },
    getPropertyPriority() { return this.priority; },
    setProperty(_, value, priority = '') { this.value = value; this.priority = priority; },
    removeProperty() { this.value = ''; this.priority = ''; },
  };
  const body = {};
  let finish;
  let resize;
  let disconnected = false;
  const document = {
    body, documentElement: { style },
    addEventListener(type, fn) { documentEvents.set(type, fn); },
    getElementById(id) { return id.startsWith('cabana-') ? { scrollIntoView: (options) => scrolls.push(options) } : null; },
  };
  const window = {
    location: { hash: '#cabana-1' },
    addEventListener(type, fn) {
      if (!windowEvents.has(type)) windowEvents.set(type, new Set());
      windowEvents.get(type).add(fn);
    },
    removeEventListener(type, fn) { windowEvents.get(type)?.delete(fn); },
    scrollTo(...args) { scrolls.push(args); },
  };
  runInNewContext(script, {
    document, window, history: { scrollRestoration: 'auto', state: { scrollY: 1200, scrollX: 0 } },
    setTimeout(fn, delay) { timers.push({ fn, delay }); },
    ResizeObserver: class {
      constructor(fn) { resize = fn; }
      observe() {}
      disconnect() { disconnected = true; }
    },
  });
  return {
    style, scrolls, timers, windowEvents, window,
    navigate(from = '/reserva/1', to = '/#cabana-1', navigationType = 'push') {
      window.location.hash = new URL(to, 'https://example.test').hash;
      documentEvents.get('astro:before-swap')({
        from: new URL(from, 'https://example.test'), to: new URL(to, 'https://example.test'), navigationType,
        newDocument: { body, documentElement: { style } },
        viewTransition: { finished: new Promise((resolve) => { finish = resolve; }) },
      });
      documentEvents.get('astro:after-swap')();
      documentEvents.get('astro:page-load')();
    },
    resize: () => resize(), finish: () => finish(), disconnected: () => disconnected,
    hashchange: () => [...windowEvents.get('hashchange')].forEach((fn) => fn()),
  };
}

test('cabin return is instant, follows layout changes, and skips legacy retries', async () => {
  const app = setup();
  app.navigate();
  assert.equal(app.style.value, 'auto');
  assert.equal(app.style.priority, 'important');
  assert.equal(app.scrolls[0].behavior, 'instant');
  assert.equal(app.timers.length, 0);
  app.resize();
  assert.equal(app.scrolls.length, 2);
  app.finish();
  await Promise.resolve();
  assert.equal(app.style.value, '');
  [...app.windowEvents.get('pointerdown')].forEach((fn) => fn());
  assert.equal(app.disconnected(), true);
  app.hashchange();
  assert.deepEqual(app.timers.map(({ delay }) => delay), [100, 500, 1500]);
});

test('browser Back without a hash preserves the history position', () => {
  const app = setup();
  app.navigate('/reserva/4', '/', 'traverse');
  assert.equal(app.scrolls[0][0].top, 1200);
  assert.equal(app.scrolls[0][0].behavior, 'instant');
  assert.equal(app.timers.length, 0);
});

test('non-cabin navigation and ordinary home anchors retain legacy behavior', () => {
  const app = setup();
  app.navigate('/galeria', '/#cabana-1');
  assert.equal(app.scrolls.length, 0);
  assert.deepEqual(app.timers.map(({ delay }) => delay), [100, 500, 1500]);
});

test('a different home anchor is not suppressed on cabin return', () => {
  const app = setup();
  app.navigate('/reserva/1', '/#cabana-1');
  app.window.location.hash = '#cabana-2';
  app.hashchange();
  assert.deepEqual(app.timers.map(({ delay }) => delay), [100, 500, 1500]);
});
