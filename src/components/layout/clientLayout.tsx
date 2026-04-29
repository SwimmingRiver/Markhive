"use client";
import { ReactNode, useState } from "react";
import SNB from "./SNB";
import Header from "./Header";

interface ClientLayoutProps {
  children: ReactNode;
  email: string;
}

export default function ClientLayout({ children, email }: ClientLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <Header email={email} onToggle={() => setIsOpen(!isOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:relative md:inset-auto md:z-auto md:shrink-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:invisible"
          }`}
        >
          <SNB />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
