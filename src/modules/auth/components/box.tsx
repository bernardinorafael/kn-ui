import type React from "react";

type ProfileBoxProps = React.ComponentProps<"section">;

export function Box({ children }: ProfileBoxProps) {
  return (
    <section className="rounded-lg border border-border bg-zinc-100">
      {children}
    </section>
  );
}
