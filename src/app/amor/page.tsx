import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// vou mostrar aqui um carrossel de fotos nossas, essas fotos estão na pasta public/images/amor

export default function Amor() {
  return (
    <div>
      <Carousel>
        <CarouselItem>
          <Image src="/images/amor/1.jpg" alt="Foto 1" width={100} height={100} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/images/amor/2.jpg" alt="Foto 2" width={100} height={100} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/images/amor/3.jpg" alt="Foto 3" width={100} height={100} />
        </CarouselItem>
      </Carousel>
    </div>
  );
}
