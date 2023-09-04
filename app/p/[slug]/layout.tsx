import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <section className="max-w-4xl m-auto p-4 leading-7">{children}</section>;
}
