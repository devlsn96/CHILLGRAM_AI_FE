export function SimpleField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">
      <div className="mb-3 text-lg font-semibold text-black">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg bg-gray-50 px-4 text-base outline-none ring-0 focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
