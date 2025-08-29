"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

interface CustomThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

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

const animationDurationMs = 800; // Match CSS animation duration
const themeChangeDelayMs = 150; // Short delay before next-themes changes the theme

function AnimatedThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [transition, setTransition] = React.useState({
    x: 0,
    y: 0,
    active: false,
    targetTheme: 'light' as 'light' | 'dark',
  });

  const toggleThemeWithEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    
    const x = event.clientX;
    const y = event.clientY;

    // Start the visual transition immediately with the new theme's color
    setTransition({ x, y, active: true, targetTheme: newTheme });
    
    // Change the actual theme state after the animation has started visually
    setTimeout(() => {
        setTheme(newTheme);
    }, themeChangeDelayMs);

    // Deactivate the transition div after the animation completes
    setTimeout(() => {
        setTransition(prev => ({...prev, active: false}));
    }, animationDurationMs);
  };
  
  const themeToggleValue = { toggleThemeWithEvent };

  // Hardcoded HSL values from globals.css for light and dark backgrounds
  const lightBackgroundHsl = '0 0% 100%'; // --background in light theme
  const darkBackgroundHsl = '222.2 84% 4.9%'; // --background in dark theme

  const animationDivBackgroundColor = transition.targetTheme === 'dark'
    ? `hsl(${darkBackgroundHsl})`
    : `hsl(${lightBackgroundHsl})`;

  return (
    <ThemeToggleContext.Provider value={themeToggleValue}>
      {children}
      {transition.active && (
        <div 
          className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
          style={{
            clipPath: `circle(0% at ${transition.x}px ${transition.y}px)`,
            backgroundColor: animationDivBackgroundColor,
            animation: `reveal ${animationDurationMs}ms forwards ease-in-out`
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
