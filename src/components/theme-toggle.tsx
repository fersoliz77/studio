'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useThemeToggle } from './theme-provider'; // Import the custom hook

export function ThemeToggle() {
  const { theme } = useTheme();
  const { toggleThemeWithEvent } = useThemeToggle(); // Use our custom toggle function
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  
  if (!mounted) {
    return <Button variant="outline" size="icon" disabled={true} />;
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleThemeWithEvent}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme === 'dark' ? 'moon' : 'sun'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
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
