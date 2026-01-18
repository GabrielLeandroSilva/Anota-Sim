import type { Metadata } from "next";
import "./globals.css";
import { NavigationProvider } from "../providers/NavigationProvider";
import { ThemeToggleProvider } from "../providers/ThemeToggleProvider";

export const metadata: Metadata = {
  title: "AnotaSim",
  description: "Seu app simples para organizar o dia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="pt-BR" suppressHydrationWarning>
  <body className="antialiased bg-gray-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
    <ThemeToggleProvider>
      <NavigationProvider>
        {children}
      </NavigationProvider>
    </ThemeToggleProvider>
  </body>
</html>
  );
}
