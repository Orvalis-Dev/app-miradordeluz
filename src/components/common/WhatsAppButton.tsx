import React from "react";

interface WhatsAppButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  phoneNumber?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "5493813513513", // Valor por defecto basado en búsqueda
  message = "",
  className = "",
  children,
  onClick,
  href,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Push event to GTM dataLayer
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "conversion",
      });
    }

    if (onClick) {
      onClick(e);
    }
  };

  const whatsappUrl =
    href ||
    `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children || "WhatsApp"}
    </a>
  );
};
