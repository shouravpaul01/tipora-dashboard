"use client";

import { Clock3, Rocket, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  description?: string;
  badge?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "This premium feature is currently under development. We're crafting an exceptional experience and it will be available soon.",
  badge = "Premium Feature",
  showButton = false,
  buttonText = "Notify Me",
  onButtonClick,
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="relative mb-8 animate-bounce">
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur">
          <Rocket className="size-11 text-primary" />
        </div>
      </div>

      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        <Sparkles className="size-4" />
        {badge}
      </div>

      {/* Title */}
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent">
        {title}
      </h1>

      {/* Description */}
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
        {description}
      </p>

      {/* Status */}
      <div className="mt-8 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
        <Clock3 className="size-4 text-amber-500" />
        Development in Progress
      </div>

      {/* Optional Button */}
      {showButton && (
        <Button
          size="lg"
          className="mt-10 rounded-full px-8"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}