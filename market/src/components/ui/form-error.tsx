import type { ReactNode } from "react";

interface FormErrorProps {
  message: string | ReactNode;
  className?: string;
}

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className={`form-error ${className}`}>{message}</div>
  );
}