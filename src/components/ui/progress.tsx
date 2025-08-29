"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full flex-1 bg-blue-600 transition-all flex items-center justify-end pr-2" // Color azul, centrado vertical, alineado a la derecha
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    >
      {value !== undefined && (
        <span className="text-xs font-medium text-white"> {/* Texto en blanco marfil, tamaño pequeño */} 
          {value}%
        </span>
      )}
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
