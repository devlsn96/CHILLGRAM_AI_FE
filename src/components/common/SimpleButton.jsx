import Button from "./Button";

export function SimpleButton({ disabled, onClick, children }) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={[
        "mt-6 h-12 w-full rounded-lg text-lg font-bold text-white",
        disabled
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-primary hover:brightness-95",
      ].join(" ")}
    >
      {children}
    </Button>
  );
}
