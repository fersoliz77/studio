"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

interface CustomThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

// Create a context to share the toggle event
const ThemeToggleContext = React.createContext<{
  toggleThemeWithEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
} | undefined>(undefined);

export function useThemeToggle() {
  const context = React.useContext(ThemeToggleContext);
  if (context === undefined) {
    throw new Error("useThemeToggle must be used within a ThemeProvider");
  }
  return context;
}

function AnimatedThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [transition, setTransition] = React.useState({
    x: 0,
    y: 0,
    active: false,
  });

  const toggleThemeWithEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    
    // Get click coordinates
    const x = event.clientX;
    const y = event.clientY;

    setTransition({ x, y, active: true });
    
    // Change theme after a short delay to allow the animation to start
    setTimeout(() => {
        setTheme(newTheme);
    }, 50); // A small delay is enough

    // Reset animation state after it completes
    setTimeout(() => {
        setTransition(prev => ({...prev, active: false}));
    }, 1200); // Should match animation duration
  };
  
  const themeToggleValue = { toggleThemeWithEvent };

  return (
    <ThemeToggleContext.Provider value={themeToggleValue}>
      {children}
      {transition.active && (
        <div 
          className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none"
          style={{
            clipPath: `circle(0% at ${transition.x}px ${transition.y}px)`,
            backgroundColor: resolvedTheme === 'dark' ? 'hsl(var(--background))' : 'hsl(var(--background))',
            animation: 'reveal 1.2s forwards ease-in-out'
          }}
        />
      )}
      <style jsx global>{`
        @keyframes reveal {
          from {
            clip-path: circle(0% at ${transition.x}px ${transition.y}px);
          }
          to {
            clip-path: circle(150% at ${transition.x}px ${transition.y}px);
          }
        }
      `}</style>
    </ThemeToggleContext.Provider>
  )
}


export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AnimatedThemeProvider>{children}</AnimatedThemeProvider>
    </NextThemesProvider>
  );
}
