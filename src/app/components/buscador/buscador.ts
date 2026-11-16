import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  imports: [FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class Buscador {
  terminoBusqueda: string = '';
  sugeridos: string[] = ['pikachu', 'charizard', 'lucario', 'gengar', 'eevee', 'mewtwo'];

  @Output() buscar = new EventEmitter<string>();

  enviarBusqueda(): void {
    if (this.terminoBusqueda.trim()) {
      this.buscar.emit(this.terminoBusqueda.trim());
    }
  }

  seleccionarRapido(nombre: string): void {
    this.terminoBusqueda = nombre;
    this.buscar.emit(nombre);
  }

  buscarAleatorio(): void {
    const idAleatorio = Math.floor(Math.random() * 898) + 1;
    this.terminoBusqueda = idAleatorio.toString();
    this.buscar.emit(idAleatorio.toString());
  }
}