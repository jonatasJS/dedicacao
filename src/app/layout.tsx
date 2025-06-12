'use client';

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { OfflineIndicator } from "@/components/OfflineIndicator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <html
      lang="pt-BR"
      className="bg-background text-foreground"
      suppressHydrationWarning
    >
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="h-full w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ThemeProvider>
        <OfflineIndicator />
      </body>
    </html>
  );
}
