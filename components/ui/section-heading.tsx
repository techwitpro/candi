type SectionHeadingProps = {
  label: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const labelColor = light ? "text-white" : "text-forest";
  const titleColor = light ? "text-white" : "text-forest";

  return (
    <div className={`flex flex-col gap-2.5 ${alignClass} ${className}`}>
      <p className={`font-label text-lg tracking-[-0.8px] leading-7 ${labelColor}`}>{label}</p>
      <h2
        className={`font-display text-[56px] leading-[65px] tracking-[-0.8px] uppercase ${titleColor}`}
      >
        {title}
      </h2>
    </div>
  );
}
