"use client";

/** +263 prefixed phone input (Core theme). Numeric keypad + light validation. */
export function PhoneInput({
  value,
  onChange,
  id = "phone",
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
}) {
  return (
    <div className="flex h-[52px] w-full items-center gap-3 rounded-input border border-divider bg-surface-alt px-4">
      <label htmlFor={id} className="select-none font-body font-extrabold text-navy-700">
        +263
      </label>
      <span aria-hidden className="h-6 w-px bg-navy-700/10" />
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        pattern="[0-9]*"
        placeholder="ENTER YOUR PHONE NUMBER"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, "").slice(0, 9))}
        className="min-w-0 flex-1 bg-transparent font-body font-bold text-navy-700 outline-none placeholder:font-semibold placeholder:text-ink/70"
      />
    </div>
  );
}

/** DEMO: any number of sane length passes — never hard-block the user. */
export function isValidPhone(v: string): boolean {
  return v.replace(/\D/g, "").length >= 6;
}
