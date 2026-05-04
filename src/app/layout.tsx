import React from "react";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/components/layout/query-client-provider";
import "./globals.css";


export const metadata: Metadata = {
  title: "DevLens | GitHub Issue Insight Dashboard",
  description: "Analyze GitHub issues visually and gain insights.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
