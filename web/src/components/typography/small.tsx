import { cn } from "@/libs/utils";

export function Small({ children, className }: { children: React.ReactNode; className?: string }) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>;
}
