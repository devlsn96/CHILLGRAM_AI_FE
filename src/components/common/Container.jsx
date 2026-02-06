import { cn } from "../../utils/cn";

export default function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-4", className)}>
      {children}
    </div>
  );
}
