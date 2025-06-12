"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

function formatarTempo(seg: number) {
  if (isNaN(seg)) return '0:00';
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function AudioPlayer() {
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mostrarPlayer, setMostrarPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    const audio = audioRef.current;
    if (!audio) return;

    if (!isOnline) {
      audio.pause();
      setTocando(false);
      setIsLoading(false);
      return;
    }

    const atualizar = () => {
      setProgresso(audio.currentTime);
      setDuracao(audio.duration || 0);
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', atualizar);
    audio.addEventListener('loadedmetadata', atualizar);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('canplay', handleCanPlay);

    if (audio.readyState === 0 && isOnline) {
      setIsLoading(true);
    }

    return () => {
      audio.removeEventListener('timeupdate', atualizar);
      audio.removeEventListener('loadedmetadata', atualizar);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [indice, isOnline]);

  const handleSeek = (val: number[]) => {
    const audio = audioRef.current;
    if (audio && duracao > 0 && isOnline) {
      audio.currentTime = val[0];
      setProgresso(val[0]);
    }
  };

  const playPause = () => {
    if (!audioRef.current || !isOnline) return;
    if (tocando) {
      audioRef.current.pause();
      setTocando(false);
    } else {
      audioRef.current.play();
      setTocando(true);
    }
  };

  const proxima = () => {
    if (!isOnline) return;
    setIndice((prev) => (prev + 1) % musicas.length);
    setTocando(false);
    setTimeout(() => setTocando(true), 100);
  };

  const anterior = () => {
    if (!isOnline) return;
    setIndice((prev) => (prev - 1 + musicas.length) % musicas.length);
    setTocando(false);
    setTimeout(() => setTocando(true), 100);
  };

  const aoTerminar = () => {
    if (!isOnline) return;
    proxima();
  };

  useEffect(() => {
    if (audioRef.current) {
      if (tocando && isOnline) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [indice, tocando, isOnline]);

  const containerVariants = {
    expanded: {
      width: 360,
      height: 'auto',
      padding: '1rem',
      borderRadius: '10px',
      transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", duration: 0.5 }
    },
    collapsed: {
      width: 48,
      height: 48,
      padding: '0.5rem',
      borderRadius: '20px',
      transition: { type: "spring", stiffness: 300, damping: 30, when: "afterChildren", duration: 0.5 }
    }
  };

  const expandedControlsVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delay: 0.2,
      },
    },
  };

  const itemVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 } },
    hidden: { y: 0, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 } },
  };

  const collapsedButtonVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, delay: 0.4 } },
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
      <AnimatePresence initial={false}>
        <motion.div
          key="audio-player-card"
          initial={mostrarPlayer ? "expanded" : "collapsed"}
          animate={mostrarPlayer ? "expanded" : "collapsed"}
          variants={containerVariants}
          className="shadow-lg bg-card overflow-hidden flex flex-col items-center gap-2 relative"
          layout
          style={{
            minWidth: mostrarPlayer ? 320 : 48,
            maxWidth: mostrarPlayer ? 360 : 48,
            cursor: mostrarPlayer ? 'default' : 'pointer',
            justifyContent: 'center',
          }}
          onClick={() => !mostrarPlayer && setMostrarPlayer(true)}
        >
          {!isOnline ? (
            <div className="flex items-center justify-center p-4 text-center text-sm text-muted-foreground">
              Áudio indisponível offline.
            </div>
          ) : (
            <>
              <audio
                ref={audioRef}
                src={musicas[indice]}
                onEnded={aoTerminar}
                preload="auto"
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onCanPlay={() => setIsLoading(false)}
              />

              <AnimatePresence mode="wait">
                {mostrarPlayer ? (
                  <motion.div
                    key="expanded-controls-content"
                    variants={expandedControlsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col items-center gap-2 w-full"
                    layout
                  >
                    <motion.div variants={itemVariants} className="absolute -top-2 -right-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMostrarPlayer(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    </motion.div>

                    <motion.h3
                      variants={itemVariants}
                      className="text-lg font-semibold whitespace-nowrap text-center"
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 'calc(100% - 40px)' }}
                    >
                      Nossas músicas
                    </motion.h3>

                    <motion.div variants={itemVariants} className="w-full flex items-center gap-2">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatarTempo(progresso)}
                      </span>
                      <div className="relative flex-grow">
                        <Slider
                          value={[progresso]}
                          max={duracao}
                          step={1}
                          onValueChange={handleSeek}
                          className={`w-full relative ${isLoading ? 'pointer-events-none' : ''}`}
                          disabled={isLoading || !isOnline}
                        />
                        {isLoading && isOnline && (
                          <div className="loading-beam absolute top-0 left-0 h-full w-1/4 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatarTempo(duracao)}
                      </span>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-around w-full gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          anterior();
                        }}
                        disabled={!isOnline}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-skip-back"
                        >
                          <polygon points="19 20 9 12 19 4 19 20"></polygon>
                          <line x1="5" y1="19" x2="5" y2="5"></line>
                        </svg>
                      </Button>
                      <Button
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          playPause();
                        }}
                        disabled={isLoading || !isOnline}
                      >
                        {tocando ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-pause"
                          >
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-play"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          proxima();
                        }}
                        disabled={!isOnline}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-skip-forward"
                        >
                          <polygon points="5 4 15 12 5 20 5 4"></polygon>
                          <line x1="19" y1="5" x2="19" y2="19"></line>
                        </svg>
                      </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center gap-2 w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-volume-1"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                      <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        onValueChange={(val) => setVolume(val[0])}
                        className="w-full"
                        disabled={!isOnline}
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed-button-content"
                    variants={collapsedButtonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex items-center justify-center"
                  >
                    <Button
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMostrarPlayer(true);
                      }}
                      disabled={!isOnline}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-music"
                      >
                        <path d="M9 18V5l12-2v13a2 2 0 0 1-2 2H9z"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <style jsx global>{`
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
    </div>
  );
}