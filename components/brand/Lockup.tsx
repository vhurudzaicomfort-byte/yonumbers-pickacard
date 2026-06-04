import Image from "next/image";
import { cn } from "@/lib/cn";

/** "PICK A CARD & WIN" display lockup — genuine extracted artwork. */
export function Lockup({
  variant = "white",
  className,
  priority,
}: {
  variant?: "white" | "purple";
  className?: string;
  priority?: boolean;
}) {
  const src =
    variant === "white"
      ? "/brand/lockup-pickacard.png"
      : "/brand/lockup-pickacard-purple.png";
  const ratio = variant === "white" ? 900 / 440 : 470 / 360;
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{ aspectRatio: String(ratio) }}
    >
      <Image
        src={src}
        alt="Pick a Card & Win"
        fill
        sizes="(max-width: 480px) 80vw, 420px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}
