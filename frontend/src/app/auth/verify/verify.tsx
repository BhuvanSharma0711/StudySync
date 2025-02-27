'use client';
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { ShootingStarsAndStarsBackgroundDemo } from "@/components/landingpagebackground";
import { useRouter } from "next/navigation";

export function Verify() {
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const token = formData.get("otp")?.toString();

    if (!email || !token) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const response = await fetch(`${apiBaseUrl}/user/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,token}),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Verification failed:", errorData);
        alert(errorData.message || "Verification failed!");
        return;
      }
  
      const data = await response.json();
      console.log("User registered successfully:", data);
  
      router.push("/auth/login");
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };
  return (
    <div>
      <ShootingStarsAndStarsBackgroundDemo></ShootingStarsAndStarsBackgroundDemo>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black relative">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Verify your email.
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" placeholder="Bhuvan9646@gmail.com" type="email" />
            </LabelInputContainer>
          <LabelInputContainer className="mb-4">
                <Label htmlFor="OTP">OTP</Label>
                <Input id="otp" name="otp" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Verify &rarr;
            <BottomGradient />
          </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
