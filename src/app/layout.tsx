import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memory Vine",
  description: "一款复古私密的数字记忆手账。"
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
