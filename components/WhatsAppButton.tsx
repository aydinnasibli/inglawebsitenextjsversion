"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const pathname = usePathname();
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/994103104114");

  useEffect(() => {
    if (pathname === "/studyabroad") {
      setWhatsappLink("https://wa.me/994103106116");
    } else {
      setWhatsappLink("https://wa.me/994103104114");
    }
  }, [pathname]);

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Bizimlə əlaqə"
    >
      <div className="absolute bottom-full right-0 mb-2 w-max px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Bizimlə əlaqə
      </div>
      <div className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center animate-pulse-slow">
        <MessageCircle className="w-7 h-7" strokeWidth={2.5} />
      </div>
    </Link>
  );
};

export default WhatsAppButton;
