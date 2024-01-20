import { cn } from "@/libs/utils";

export function TypographyLarge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}
