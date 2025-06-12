"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageCarousel } from "@/components/amor/ImageCarousel";
import { AudioPlayer } from "@/components/amor/AudioPlayer";
import { TimeTogether } from "@/components/amor/TimeTogether";
import { AnimatedTitle } from "@/components/amor/AnimatedTitle";
import { PoemSection } from "@/components/amor/PoemSection";

export const dynamic = 'force-static';

export default function Amor() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
    }
  }, [router]);

  if (!isLoggedIn) {
    return null; // Não renderiza nada se não estiver logado
  }

  return (
    <>
      <AudioPlayer />

      <div
        className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
        <AnimatedTitle />

        <ImageCarousel />
        <style jsx global>{`
          .fade-img {
            transition: opacity 0.5s;
          }
          .transition-opacity {
            transition: opacity 0.4s;
          }
          .transition-all {
            transition-property: opacity, transform;
          }
          @keyframes beam-animation {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }
          .loading-beam {
            animation: beam-animation 1.5s infinite linear;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent);
          }
        `}</style>

        <PoemSection />

        <TimeTogether />
      </div>
    </>
  );
}
