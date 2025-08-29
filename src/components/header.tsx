'use client';
import Link from "next/link";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          PortfolioPro
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
          <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/summarize">
              <Rocket className="mr-2 h-4 w-4" />
              AI Summary Tool
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
