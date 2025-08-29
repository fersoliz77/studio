import React from 'react';

export const AndroidIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17.5 11.5c0-3.03-2.47-5.5-5.5-5.5s-5.5 2.47-5.5 5.5" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <path d="M5.5 12.5v4c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2v-4" />
    <line x1="8" y1="8" x2="9" y2="6" />
    <line x1="16" y1="8" x2="15" y2="6" />
  </svg>
);
