"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center z-0">
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
