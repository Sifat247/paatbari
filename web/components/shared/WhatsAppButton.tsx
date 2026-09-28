"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/present"))) {
    return null;
  }

  return (
    <a
      href="https://wa.me/8801793648214?text=Hello%20Paatbari%2C%20I%20have%20an%20inquiry"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-5 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-pop hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
        WhatsApp Chat
      </span>
    </a>
  );
}
