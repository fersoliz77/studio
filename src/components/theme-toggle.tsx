'use client';
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from 'react';
import { ThemeToggleContext } from './theme-provider';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { toggleThemeWithEvent } = useContext(ThemeToggleContext);

  return (
    <Button variant="outline" size="icon" onClick={toggleThemeWithEvent}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme === 'dark' ? 'moon' : 'sun'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full w-full flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
