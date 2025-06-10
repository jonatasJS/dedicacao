"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const images = [
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

export default function Amor() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempoJuntos, setTempoJuntos] = useState("");

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

  useEffect(() => {
    const dataInicio = new Date('2023-12-05T00:00:00');

    const calcularTempo = () => {
      const agora = new Date();
      const diferencaMs = agora.getTime() - dataInicio.getTime();

      const segundosTotais = Math.floor(diferencaMs / 1000);
      const minutosTotais = Math.floor(segundosTotais / 60);
      const horasTotais = Math.floor(minutosTotais / 60);
      const diasTotais = Math.floor(horasTotais / 24);

      const anos = Math.floor(diasTotais / 365.25); // Considerando anos bissextos para cálculo de média
      const diasRestantesAposAnos = diasTotais % 365.25;

      const meses = Math.floor(diasRestantesAposAnos / 30.4375); // Média de dias em um mês
      const diasRestantesAposMeses = Math.floor(diasRestantesAposAnos % 30.4375);

      const segRestantes = segundosTotais % 60;
      const minRestantes = minutosTotais % 60;
      const horasRestantes = horasTotais % 24;

      const horasFormatadas = horasRestantes.toString().padStart(2, '0');
      const minutosFormatados = minRestantes.toString().padStart(2, '0');
      const segundosFormatados = segRestantes.toString().padStart(2, '0');

      setTempoJuntos(`Estamos juntos há:
        ${anos} anos,
        ${meses} meses,
        ${diasRestantesAposMeses} dias
        ${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`);
    };

    const intervalId = setInterval(calcularTempo, 1000);
    calcularTempo(); // Chama uma vez imediatamente para evitar delay inicial

    return () => clearInterval(intervalId);
  }, []);

  // Carrossel de fotos nossas, loop infinito, botões, 500x500px, fade, autoplay
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Alternância dos ícones no título
  const [invertido, setInvertido] = useState(false);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setInvertido((prev) => !prev);
        setFade(true);
      }, 1000); // tempo do fadeout
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Player de áudio
  const musicas = [
    "/musics/music1.mp3",
    "/musics/music2.mp3",
    "/musics/music3.mp3",
    "/musics/music4.mp3",
    "/musics/music5.mp3",
  ];
  const [indice, setIndice] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progresso, setProgresso] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, indice]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const atualizar = () => {
      setProgresso(audio.currentTime);
      setDuracao(audio.duration || 0);
    };
    audio.addEventListener('timeupdate', atualizar);
    audio.addEventListener('loadedmetadata', atualizar);
    return () => {
      audio.removeEventListener('timeupdate', atualizar);
      audio.removeEventListener('loadedmetadata', atualizar);
    };
  }, [indice]);

  const handleSeek = (val: number[]) => {
    const audio = audioRef.current;
    if (audio && duracao > 0) {
      audio.currentTime = val[0];
      setProgresso(val[0]);
    }
  };

  const playPause = () => {
    if (!audioRef.current) return;
    if (tocando) {
      audioRef.current.pause();
      setTocando(false);
    } else {
      audioRef.current.play();
      setTocando(true);
    }
  };

  const proxima = () => {
    setIndice((prev) => (prev + 1) % musicas.length);
    setTocando(false);
    setTimeout(() => setTocando(true), 100);
  };

  const anterior = () => {
    setIndice((prev) => (prev - 1 + musicas.length) % musicas.length);
    setTocando(false);
    setTimeout(() => setTocando(true), 100);
  };

  const aoTerminar = () => {
    proxima();
  };

  useEffect(() => {
    if (audioRef.current) {
      if (tocando) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [indice, tocando]);

  const [mostrarPlayer, setMostrarPlayer] = useState(false);

  if (!isLoggedIn) {
    return null; // Não renderiza nada se não estiver logado
  }

  return (
    <>
      {/* Player fixo no topo esquerdo, com animação de expandir/recolher */}
      <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
        {/* Botão de abrir, sempre visível quando fechado */}
        {!mostrarPlayer && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setMostrarPlayer(true)}
            className="shadow-lg"
            title="Exibir player"
            style={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}
          >
            <span role="img" aria-label="Exibir">🎵</span>
          </Button>
        )}
        {/* Player animado, só aparece quando mostrarPlayer=true */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden bg-transparent ${mostrarPlayer ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 pointer-events-none'}`}
          style={{
            width: mostrarPlayer ? 360 : 0,
            minWidth: mostrarPlayer ? 320 : 0,
            maxWidth: mostrarPlayer ? 360 : 0,
            padding: mostrarPlayer ? '0.5rem 1.5rem 0.5rem 0.5rem' : 0,
            background: 'transparent',
            position: mostrarPlayer ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            display: mostrarPlayer ? 'block' : 'none',
          }}
        >
          <Card
            className="flex flex-col items-center gap-2 shadow-lg w-full relative p-0 border-0 bg-card"
            style={{
              width: 350,
              minWidth: 350,
              maxWidth: 350,
              padding: '1rem',
              boxShadow: undefined,
              border: undefined,
              transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMostrarPlayer(false)}
              className="absolute -top-2 -right-2"
              title="Recolher"
            >
              <span role="img" aria-label="Recolher">⬅️</span>
            </Button>
            <audio
              ref={audioRef}
              src={musicas[indice]}
              onEnded={aoTerminar}
              preload="auto"
            />
            <div className="flex flex-row items-center w-full gap-4 justify-center mb-2">
              <Button size="icon" variant="ghost" onClick={anterior} title="Anterior">
                <span aria-label="Anterior" role="img">⏮️</span>
              </Button>
              <Button size="icon" variant="ghost" onClick={playPause} title={tocando ? "Pausar" : "Tocar"}>
                {tocando ? <span aria-label="Pause" role="img">⏸️</span> : <span aria-label="Play" role="img">▶️</span>}
              </Button>
              <Button size="icon" variant="ghost" onClick={proxima} title="Próxima">
                <span aria-label="Próxima" role="img">⏭️</span>
              </Button>
              <div className="flex flex-row items-center gap-2 ml-4">
                <span role="img" aria-label="Volume" className="text-lg">🔊</span>
                <Slider
                  min={0}
                  max={100}
                  value={[volume]}
                  onValueChange={(val: number[]) => setVolume(val[0])}
                  className="w-20"
                />
                <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">{volume}%</span>
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-2">
              <Slider
                min={0}
                max={duracao || 1}
                value={[progresso]}
                onValueChange={(val: number[]) => handleSeek(val)}
                className="w-full"
              />
              <div className="flex justify-between w-full text-xs text-muted-foreground">
                <span>{formatarTempo(progresso)}</span>
                <span>{formatarTempo(duracao)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      >
        <h1 className="text-center text-3xl font-bold mb-4">
          <span>
            {invertido ? (
              <span
                className={`inline-block transition-opacity animate-ping duration-1000`}
              >
                ♾️💖
              </span>
            ) : (
              <span
                className={`inline-block transition-opacity animate-ping duration-1000`}
              >
                💖♾️
              </span>
            )}
            <br />
            Meu amor por você é infinito
            <br />
            {invertido ? (
              <span
                className={`inline-block transition-opacity animate-ping duration-1000`}
              >
                💘♾️
              </span>
            ) : (
              <span
                className={`inline-block transition-opacity animate-ping duration-1000`}
              >
                ♾️💘
              </span>
            )}
          </span>
        </h1>

        <Carousel
          className="w-[400px] h-[400px] relative rounded-2xl"
          opts={{ loop: true }}
          plugins={[autoplay.current]}
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1 w-full h-full rounded-2xl flex items-center justify-center">
                  <Card className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden py-0 px-0">
                    <CardContent className="flex rounded-2xl aspect-square items-center justify-center py-0 px-0 w-full h-full transition-opacity duration-500">
                      <Image
                        src={src}
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
        `}</style>

        <div
          className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-center text-lg"
        >
          <h1 className="text-2xl font-bold">“Spoiler do Paraíso”</h1>

          <p className="text-lg">Amor,<br />
            entre todas as canções que já tocaram meu coração,<br />
            você é a melodia que nunca desafina.<br />
            É como se Djavan tivesse te descrito<br />
            quando falou de um amor puro,<br />
            que não sabe a força que tem<br />
            até florescer em silêncio dentro da gente.</p>

          <p className="text-lg">Você chegou feito tarde de terça,<br />
            leve, mas cheia de promessa.<br />
            Feito calmaria depois da tempestade,<br />
            e eu só pude sorrir,<br />
            porque encontrei paz no teu abraço,<br />
            e abrigo no teu olhar.</p>

          <p className="text-lg">É que eu te amo num tom que não passa.<br />
            Te amo com aquele sentimento que não desbota,<br />
            mesmo com o tempo.<br />
            Te amo com o peito aberto,<br />
            como quem já sabe que encontrou<br />
            o spoiler do paraíso — e o final é a gente junto.</p>

          <p className="text-lg">Você é minha “querida”,<br />
            não daquelas que se chamam por costume,<br />
            mas daquelas que se ama por destino.<br />
            Minha parceira, minha casa,<br />
            minha aventura diária no mundo que a gente construiu<br />
            com carinho, tropeços e muito riso bobo.</p>

          <p className="text-lg">Hoje é Dia dos Namorados,<br />
            mas pra mim, cada dia contigo é isso:<br />
            uma nova chance de te escolher de novo.<br />
            De namorar teu sorriso, tua coragem,<br />
            teus sonhos — que agora também são meus.</p>

          <p className="text-lg">Seguimos sendo eternos namorados,<br />
            mesmo depois do "sim",<br />
            do <strong className="font-bold">Lucca, nosso amado filho</strong>, das contas, da rotina.<br />
            Porque o que temos é mais que costume,<br />
            é amor em estado de poesia.</p>

          <p className="text-lg">E se um dia alguém perguntar o que é amar de verdade,<br />
            eu só vou dizer:<br />
            amar é viver com você.</p>

          <h1 className="text-2xl font-bold text-center animate-bounce">Eu te amo</h1>
        </div>

        <p className="text-center text-xl font-medium -mt-16">
          {tempoJuntos}
        </p>
      </div>
    </>
  );
}

function formatarTempo(seg: number) {
  if (isNaN(seg)) return '0:00';
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
