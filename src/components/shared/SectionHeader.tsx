import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Heading } from "./typography";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: ReactNode;

  // ✅ Supports string, JSX, icons, badges, etc.
  title: ReactNode;
  titleClassName?: string;

  // ✅ Description can also be JSX
  description?: ReactNode;

  align?: "left" | "center";
  right?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  titleClassName,
  description,
  align = "left",
  right,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-5",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      {/* Left / Center Content */}
      <div
        className={cn(
          "flex flex-col gap-1",
          align === "center" && "items-center"
        )}
      >
        {badge && (
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full bg-primary/20 px-3 py-2 text-base font-medium text-primary">
            {badgeIcon}
            <span>{badge}</span>
          </div>
        )}

        <Heading
          size="h4"
          className={cn("max-w-3xl font-playfair", titleClassName)}
        >
          {title}
        </Heading>

        {description && (
          <div className="max-w-[550px] text-neutral-500">
            {description}
          </div>
        )}
      </div>

      {/* Right Content */}
      {right && align !== "center" && (
        <div className="mt-1 flex shrink-0 items-center gap-2">
          {right}
        </div>
      )}
    </div>
  );
}