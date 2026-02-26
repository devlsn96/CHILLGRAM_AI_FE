import { cn } from "../../utils/cn";

export default function Button({
  href,
  label,
  className,
  variant = "primary", // primary | secondary | ghost
  size = "md", // sm | md | lg
  type = "button", // button | submit
  disabled,
  isLoading,
  children,
  ...props
}) {
  const base =
    "items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "inline-flex transition rounded-lg px-6 py-3 bg-primary font-extrabold text-black hover:bg-yellow-500 focus:ring-primary",
    secondary:
      "inline-flex rounded-lg transition px-6 py-3 bg-white text-gray-900 font-extrabold hover:bg-gray-200 focus:ring-gray-300 shadow-sm",
    ghost: "inline-flex rounded-lg transition bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
    cta: "inline-flex rounded-lg px-6 transition bg-primary rounded-md text-white font-semibold hover:brightness-95",
    quick: "w-full py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 flex justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all shadow-sm"
  };

  const sizes = {
    sm: "h-9 px-3  text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
  };

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {label}
        {children}
      </a>
    );
  }

  if (type === "submit") {
    return (
      <button
        className={[
          "mt-6 h-12 w-full rounded-lg text-lg font-bold text-white",
          props.disabled
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-primary text-white hover:brightness-95",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {label}
      {children}
    </button>
  );
}
