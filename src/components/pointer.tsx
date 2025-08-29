'use client';

import { useEffect, useState } from 'react';

export function Pointer() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
            setIsHovering(true);
        }
    };

    const handleMouseOut = (e: MouseEvent) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
            setIsHovering(false);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className="pointer"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovering ? 1.5 : 1})`,
        opacity: isHovering ? 0.5 : 1,
      }}
    />
  );
}
