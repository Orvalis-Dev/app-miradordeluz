import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const astroRequire = createRequire(require.resolve('astro/package.json'));
const { transformWithEsbuild } = await import(pathToFileURL(astroRequire.resolve('vite')).href);

async function loadComponent(path, props = {}) {
  const source = readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
  const { code } = await transformWithEsbuild(source, path, {
    loader: 'tsx', format: 'cjs', jsx: 'transform', jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  });
  const states = [];
  const listeners = new Set();
  let index;
  let effects;
  let cleanups = [];
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
    Fragment: 'fragment',
    useState(initial) {
      const slot = index++;
      if (!(slot in states)) states[slot] = initial;
      return [states[slot], value => {
        states[slot] = typeof value === 'function' ? value(states[slot]) : value;
      }];
    },
    useEffect: effect => effects.push(effect),
    useCallback: callback => callback,
    useRef: value => ({ current: value }),
  };
  const icons = new Proxy({}, { get: (_, name) => name });
  const module = { exports: {} };
  runInNewContext(code, {
    module, exports: module.exports, React,
    document: { body: { style: {} } },
    window: {
      addEventListener: (type, handler) => { if (type === 'keydown') listeners.add(handler); },
      removeEventListener: (type, handler) => { if (type === 'keydown') listeners.delete(handler); },
    },
    require: name => name === 'react' ? React : name === 'framer-motion'
      ? { motion: icons, AnimatePresence: 'AnimatePresence' } : icons,
  });
  return {
    listeners,
    render() {
      cleanups.forEach(cleanup => cleanup?.());
      index = 0;
      effects = [];
      const tree = module.exports.default(props);
      cleanups = effects.map(effect => effect());
      return tree;
    },
    key: key => [...listeners].forEach(handler => handler({ key })),
    unmount: () => cleanups.forEach(cleanup => cleanup?.()),
  };
}

function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  return [tree, ...tree.children.flatMap(nodes)];
}

test('services Escape closes only an open dialog and cleans up across reopen/unmount', async () => {
  const app = await loadComponent('src/components/sections/SectionServicios.tsx');
  let tree = app.render();
  assert.equal(app.listeners.size, 0);
  const open = () => nodes(tree).find(node => node.type === 'button').props.onClick();
  for (let attempt = 0; attempt < 2; attempt++) {
    open();
    tree = app.render();
    assert.equal(app.listeners.size, 1);
    app.key('Enter');
    tree = app.render();
    assert.ok(nodes(tree).some(node => node.props.role === 'dialog'));
    app.key('Escape');
    tree = app.render();
    assert.ok(!nodes(tree).some(node => node.props.role === 'dialog'));
    assert.equal(app.listeners.size, 0);
  }
  open();
  app.render();
  app.unmount();
  assert.equal(app.listeners.size, 0);
});

test('cabin gallery close and navigation controls have accessible names', async () => {
  const app = await loadComponent('src/components/domain/gallery/CabanaGalleryGrid.tsx', {
    images: [{ desktop: '/test.webp', mobile: '/test.webp', alt: 'Test image' }],
    cabanaName: 'Cabaña 1', cabanaId: '1',
  });
  const preview = app.render();
  nodes(preview).find(node => node.props.onClick).props.onClick({ stopPropagation() {} });
  const buttons = nodes(app.render()).filter(node => node.type === 'button');
  for (const name of ['Cerrar galería', 'Foto anterior', 'Foto siguiente']) {
    assert.ok(buttons.some(button => button.props['aria-label'] === name), name);
  }
  app.unmount();
});
