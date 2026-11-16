import { Component, Input, OnChanges } from '@angular/core';
import { DatosCompletosPokemon } from '../../services/pokeapi';
import { UpperCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tarjeta-pokemon',
  imports: [UpperCasePipe, TitleCasePipe],
  templateUrl: './tarjeta-pokemon.html',
  styleUrl: './tarjeta-pokemon.css'
})
export class TarjetaPokemon implements OnChanges {
  @Input({ required: true }) pokemon!: DatosCompletosPokemon;

  nivel: number = 1;
  energia: number = 100;
  mensajeAccion: string = 'Listo para analizar o entrenar.';

  ngOnChanges(): void {
    this.nivel = 1;
    this.energia = 100;
    this.mensajeAccion = `${this.pokemon.nombre.toUpperCase()} cargado en el laboratorio.`;
  }

  entrenar(): void {
    if (this.energia >= 15 && this.nivel < 100) {
      this.energia -= 15;
      this.nivel += 5;
      this.mensajeAccion = `¡Entrenamiento completado! Subió al nivel ${this.nivel} y sus estadísticas escalaron.`;
    } else if (this.nivel >= 100) {
      this.mensajeAccion = 'Nivel máximo (100) alcanzado.';
    } else {
      this.mensajeAccion = 'Energía insuficiente. Necesita descansar antes de seguir entrenando.';
    }
  }

  descansar(): void {
    this.energia = Math.min(100, this.energia + 30);
    this.mensajeAccion = `Descanso completado. Energía actual: ${this.energia}%.`;
  }

  reiniciar(): void {
    this.nivel = 1;
    this.energia = 100;
    this.mensajeAccion = 'Valores de entrenamiento reiniciados a Nivel 1.';
  }

  calcularStatReal(base: number, nombreStat: string): number {
    if (nombreStat === 'hp') {
      return Math.floor(((2 * base) * this.nivel) / 100) + this.nivel + 10;
    }
    return Math.floor(((2 * base) * this.nivel) / 100) + 5;
  }
}