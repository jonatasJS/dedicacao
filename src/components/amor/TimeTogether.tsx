"use client";

import React, { useState, useEffect } from "react";

export function TimeTogether() {
  const [tempoJuntos, setTempoJuntos] = useState("");

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

  return (
    <p className="text-center text-xl font-medium -mt-16">
      {tempoJuntos}
    </p>
  );
}