"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const originalImages = [
  "/images/amor/IMG_9963.jpg",
  "/images/amor/IMG_9958.jpg",
  "/images/amor/IMG_8311.jpg",
  "/images/amor/IMG_8310.jpg",
  "/images/amor/IMG_8303.jpg",
  "/images/amor/IMG_8302.jpg",
  "/images/amor/IMG_5082.jpg",
  "/images/amor/IMG_5080.jpg",
  "/images/amor/IMG_5077.jpg",
  "/images/amor/IMG_5075.jpg",
  "/images/amor/IMG_5072.jpg",
  "/images/amor/IMG_3093.jpg",
  "/images/amor/IMG_3092.jpg",
  "/images/amor/IMG_1679.jpg",
  "/images/amor/IMG_1678.jpg",
  "/images/amor/IMG_1677.jpg",
  "/images/amor/IMG_1676.jpg",
  "/images/amor/IMG_1675.jpg",
  "/images/amor/IMG_1674.jpg",
  "/images/amor/IMG_1673.jpg",
  "/images/amor/IMG_1672.jpg",
  "/images/amor/IMG_1671.jpg",
  "/images/amor/IMG_1670.jpg",
  "/images/amor/IMG_1669.jpg",
  "/images/amor/IMG_1668.jpg",
  "/images/amor/IMG_1667.jpg",
  "/images/amor/IMG_1666.jpg",
  "/images/amor/IMG_1665.jpg",
  "/images/amor/IMG_1664.jpg",
  "/images/amor/IMG_1663.jpg",
  "/images/amor/IMG_1662.jpg",
  "/images/amor/IMG_1661.jpg",
  "/images/amor/IMG_1660.jpg",
  "/images/amor/IMG_1659.jpg",
  "/images/amor/IMG_1658.jpg",
  "/images/amor/IMG_1196.jpg",
  "/images/amor/IMG_0903.jpg",
  "/images/amor/IMG_0769.jpg",
  "/images/amor/IMG_0662.jpg",
  "/images/amor/IMG_0651.jpg",
  "/images/amor/e5be3ad3-3c8f-4ac2-9b86-7930909e26b4.jpg",
  "/images/amor/7aad1c79-a8e0-499b-964e-305546428076.jpg",
  "/images/amor/59104ab9-ec3b-4eb7-a8bd-5dcddfc062ee.jpg",
  "/images/amor/4220b755-8e19-47a1-939c-ab1d013763d5.jpg",
  "/images/amor/2187f909-c3f5-4bfd-a050-fa01415caee4.jpg",
];

// Função para embaralhar um array (algoritmo Fisher-Yates)
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function ImageCarousel() {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [isLoading, setIsLoading] = useState(true);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setIsLoading(false);
      return;
    }

    setShuffledImages(shuffleArray(originalImages));

    let loadedImagesCount = 0;
    const totalImages = originalImages.length;

    const handleImageLoad = () => {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        setIsLoading(false);
      }
    };

    originalImages.forEach((src) => {
      const img = new (window as any).Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error(`Erro ao carregar a imagem: ${src}`);
        loadedImagesCount++; 
        if (loadedImagesCount === totalImages) {
          setIsLoading(false);
        }
      };
    });
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div className="flex items-center justify-center h-[400px] w-[400px] text-lg text-muted-foreground bg-gray-200 rounded-2xl">
        Imagens indisponíveis offline.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] w-[400px] text-lg text-muted-foreground">
        Carregando imagens...
      </div>
    );
  }

  return (
    <Carousel
      className="w-[400px] h-[400px] relative rounded-2xl"
      opts={{ loop: true }}
      plugins={[autoplay.current]}
    >
      <CarouselContent>
        {shuffledImages.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full h-full rounded-2xl flex items-center justify-center">
              <Card className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden py-0 px-0">
                <CardContent className="flex rounded-2xl aspect-square items-center justify-center py-0 px-0 w-full h-full transition-opacity duration-500">
                  <Image
                    src={src}
                    quality={75}
                    alt={`Foto ${index + 1}`}
                    className="object-cover w-full h-full rounded-xl fade-img"
                    width={400}
                    height={400}
                    style={{ width: 400, height: 400 }}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
} 