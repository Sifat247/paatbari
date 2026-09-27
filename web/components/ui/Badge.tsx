import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "eco" | "sale" | "handmade" | "neutral";
}

export function Badge({ className = "", variant = "neutral", children, ...props }: BadgeProps) {
  const variantStyles = {
    eco: "bg-leaf text-white",
    sale: "bg-clay text-white",
    handmade: "bg-jute text-ink font-medium",
    neutral: "bg-sand text-ink",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs tracking-wide shadow-xs ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
