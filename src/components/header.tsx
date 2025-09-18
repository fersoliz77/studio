'use client';
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useTranslation } from 'react-i18next';
import { FaRocket, FaBars } from 'react-icons/fa';

const navItems = [
  { id: "skills", label: "header.skills" },
  { id: "projects", label: "header.work" },
  { id: "contact", label: "header.contact" },
];

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 800);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollY / documentHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuMenuOpen(false);

  const getLinkHref = (id: string) => {
    return pathname === '/' ? `#${id}` : `/#${id}`;
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-500 ease-out",
      isMounted ? "top-0" : "-top-20",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary font-headline">
          {t('header.name')}
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          {navItems.map(item => (
            <Link key={item.id} href={getLinkHref(item.id)} className="hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex transition-transform duration-300 hover:scale-105">
            <Link href="/summarize">
              <FaRocket className="mr-2 h-4 w-4" />
              {t('header.aiAssistant')}
            </Link>
          </Button>
          <ThemeToggle />
          <LanguageToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <FaBars className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6 pt-12">
                {navItems.map(item => (
                  <Link key={item.id} href={getLinkHref(item.id)} className="text-2xl font-medium hover:text-primary transition-colors" onClick={closeMobileMenu}>
                    {t(item.label)}
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
      <div
        className="absolute bottom-0 left-0 h-1 bg-fireBlue transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
