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

const animationDurationMs = 700; // Match CSS animation duration (0.7s)

function AnimatedThemeProvider({ children }: CustomThemeProviderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const overlayRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    overlayRef.current = document.getElementById("theme-transition-overlay");
  }, []);

  const toggleThemeWithEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    
    const x = event.clientX;
    const y = event.clientY;

    if (overlayRef.current) {
      overlayRef.current.style.setProperty('--theme-transition-start-x', `${x}px`);
      overlayRef.current.style.setProperty('--theme-transition-start-y', `${y}px`);

      // Mejorar la obtención del color de fondo del nuevo tema
      const htmlElement = document.documentElement;
      const currentHtmlClass = htmlElement.className; // Guardar la clase actual del <html>

      // Aplicar temporalmente la clase del nuevo tema para obtener el color
      if (newTheme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }

      const computedHtmlStyle = getComputedStyle(htmlElement);
      const newThemeBackgroundColor = computedHtmlStyle.getPropertyValue('--background').trim();

      // Restaurar la clase original del <html> inmediatamente
      htmlElement.className = currentHtmlClass;

      // 1. Establecer el color de fondo del overlay al color del *nuevo* tema
      overlayRef.current.style.backgroundColor = `hsl(${newThemeBackgroundColor})`;
      
      // 2. En el siguiente frame de animación, activar el overlay.
      //    El overlay con el nuevo color empieza a expandirse sobre el tema actual.
      requestAnimationFrame(() => {
        if (overlayRef.current) {
          overlayRef.current.classList.add('active');
        }
      });

      // 3. Cambiar el tema real de la página una vez que el overlay esté lo suficientemente grande.
      //    Esto crea el efecto de "revelado".
      setTimeout(() => {
        setTheme(newTheme);
      }, animationDurationMs / 2); // Cambiar el tema a mitad de la animación de expansión

      // 4. Desactivar el div de transición después de que la animación se complete (revelando el nuevo tema)
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.classList.remove('active');
          // Restablecer el color de fondo a transparente para evitar cualquier color residual
          overlayRef.current.style.backgroundColor = 'transparent'; 
        }
      }, animationDurationMs); 
    }
  };
  
  const themeToggleValue = { toggleThemeWithEvent };

  return (
    <ThemeToggleContext.Provider value={themeToggleValue}>
      {children}
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
