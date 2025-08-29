'use client';
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Rocket, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useTranslation } from 'react-i18next';
import '../i18n';

const navLinks = [
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "work" },
  { href: "#contact", label: "contact" },
];

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary font-headline">
          Jane Doe
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              {isClient ? t(link.label) : link.label.charAt(0).toUpperCase() + link.label.slice(1)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex transition-transform duration-300 hover:scale-105">
            <Link href="/summarize">
              <Rocket className="mr-2 h-4 w-4" />
              {isClient ? t('aiAssistant') : 'AI Assistant'}
            </Link>
          </Button>
          <ThemeToggle />
          <LanguageToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6 pt-12">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-2xl font-medium hover:text-primary transition-colors" onClick={closeMobileMenu}>
                    {isClient ? t(link.label) : link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/summarize" onClick={closeMobileMenu}>
                    <Rocket className="mr-2 h-4 w-4" />
                    {isClient ? t('aiAssistant') : 'AI Assistant'}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
