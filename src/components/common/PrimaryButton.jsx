export function PrimaryButton({
  children,
  className = "",
  type = "submit",
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        "mt-6 h-12 w-full rounded-lg text-lg font-bold text-white",
        props.disabled
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-[#61AFFE] text-white hover:brightness-95",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
