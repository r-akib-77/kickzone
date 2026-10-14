import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">{kicker}</p>
      <h2 className="font-sport mt-2 text-3xl font-black leading-tight sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-3 text-[#A5ADB4]">{sub}</p> : null}
    </div>
  );
}
