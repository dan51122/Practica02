import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NodoEvolucion } from '../../services/pokeapi';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cadena-evolutiva',
  imports: [TitleCasePipe],
  templateUrl: './cadena-evolutiva.html',
  styleUrl: './cadena-evolutiva.css'
})
export class CadenaEvolutiva {
  @Input({ required: true }) evoluciones: NodoEvolucion[] = [];
  @Input() actualNombre: string = '';
  @Output() seleccionarEvolucion = new EventEmitter<string>();

  elegir(nombre: string): void {
    if (nombre !== this.actualNombre) {
      this.seleccionarEvolucion.emit(nombre);
    }
  }
}