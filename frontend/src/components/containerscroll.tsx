"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function HeroScrollDemo({children}:{children:React.ReactNode}) {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white dark:text-white">
              We present you your college assistant <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-white">
              𝒞αмρυѕ✘
              </span>
            </h1>
          </>
        }
      >
        {children}
      </ContainerScroll>
    </div>
  );
}
