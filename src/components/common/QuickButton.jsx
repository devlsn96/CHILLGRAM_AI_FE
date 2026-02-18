import Button from "./Button";

export function QuickButton({ icon: Icon, label, onClick }) {
  return (
    <Button variant="quick" onClick={onClick}>
      {Icon && <Icon size={20} className="text-gray-400" />}
      {label}
    </Button>
  );
}
