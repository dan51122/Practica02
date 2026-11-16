import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { PokeapiService, DatosCompletosPokemon } from './services/pokeapi';
import { Buscador } from './components/buscador/buscador';
import { TarjetaPokemon } from './components/tarjeta-pokemon/tarjeta-pokemon';
import { CadenaEvolutiva } from './components/cadena-evolutiva/cadena-evolutiva';

@Component({
  selector: 'app-root',
  imports: [Buscador, TarjetaPokemon, CadenaEvolutiva],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private pokeService = inject(PokeapiService);
  private cdr = inject(ChangeDetectorRef);

  pokemonActual: DatosCompletosPokemon | null = null;
  cargando: boolean = false;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarPokemon('lucario');
  }

  cargarPokemon(termino: string): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.cdr.detectChanges();

    this.pokeService.obtenerPokemonCompleto(termino).subscribe({
      next: (datos) => {
        this.pokemonActual = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.pokemonActual = null;
        this.cargando = false;
        this.errorMensaje = `No se encontró ningún Pokémon con "${termino}". Verifica el nombre o número de Pokédex e inténtalo de nuevo.`;
        this.cdr.detectChanges();
      }
    });
  }
}