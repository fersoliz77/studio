'use client';
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// Eliminadas las importaciones de lucide-react
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useTranslation } from 'react-i18next';
// Importar iconos de react-icons
import { FaRocket, FaBars } from 'react-icons/fa';

const navLinks = [
  { href: "#skills", label: "header.skills" },
  { href: "#projects", label: "header.work" },
  { href: "#contact", label: "header.contact" },
];

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollY / documentHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(scrollY > 10);
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
          {t('header.name')}
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              {t(link.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex transition-transform duration-300 hover:scale-105">
            <Link href="/summarize">
              <FaRocket className="mr-2 h-4 w-4" /> {/* Icono de cohete de react-icons */}
              {t('header.aiAssistant')}
            </Link>
          </Button>
          <ThemeToggle />
          <LanguageToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <FaBars className="h-6 w-6" /> {/* Icono de menú de react-icons */}
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6 pt-12">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-2xl font-medium hover:text-primary transition-colors" onClick={closeMobileMenu}>
                    {t(link.label)}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/summarize" onClick={closeMobileMenu}>
                    <FaRocket className="mr-2 h-4 w-4" />
                    {t('header.aiAssistant')}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-fireBlue transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
