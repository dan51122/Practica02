import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';

export interface NodoEvolucion {
  nombre: string;
  id: string;
  imagen: string;
}

export interface DatosCompletosPokemon {
  id: number;
  nombre: string;
  imagen: string;
  tipos: string[];
  estadisticas: { nombre: string; base: number }[];
  altura: number;
  peso: number;
  habilidades: string[];
  descripcion: string;
  generacion: string;
  habitat: string;
  tasaCaptura: number;
  evoluciones: NodoEvolucion[];
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://pokeapi.co/api/v2';

  obtenerPokemonCompleto(termino: string): Observable<DatosCompletosPokemon> {
    const query = termino.trim().toLowerCase();

    // 1. Endpoint /pokemon
    return this.http.get<any>(`${this.BASE_URL}/pokemon/${query}`).pipe(
      switchMap((pokemonData) =>
        // 2. Endpoint /pokemon-species (usando la URL o ID de especie)
        this.http.get<any>(pokemonData.species.url).pipe(
          switchMap((speciesData) =>
            // 3. Endpoint /evolution-chain (usando la URL entregada por species)
            this.http.get<any>(speciesData.evolution_chain.url).pipe(
              map((evolutionData) => this.formatearDatos(pokemonData, speciesData, evolutionData))
            )
          )
        )
      )
    );
  }

  private formatearDatos(pokemon: any, species: any, evolution: any): DatosCompletosPokemon {
    // Buscar descripción en español (o inglés como respaldo)
    const entradaEs = species.flavor_text_entries.find((e: any) => e.language.name === 'es');
    const entradaEn = species.flavor_text_entries.find((e: any) => e.language.name === 'en');
    const textoCrudo = entradaEs ? entradaEs.flavor_text : (entradaEn ? entradaEn.flavor_text : 'Sin descripción disponible.');
    const descripcion = textoCrudo.replace(/[\n\f\r]/g, ' ');

    // Extraer cadena evolutiva completa
    const evoluciones: NodoEvolucion[] = [];
    let actual = evolution.chain;
    while (actual) {
      const urlPartes = actual.species.url.split('/').filter(Boolean);
      const idEspecie = urlPartes[urlPartes.length - 1];
      evoluciones.push({
        nombre: actual.species.name,
        id: idEspecie,
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idEspecie}.png`
      });
      actual = actual.evolves_to && actual.evolves_to.length > 0 ? actual.evolves_to[0] : null;
    }

    return {
      id: pokemon.id,
      nombre: pokemon.name,
      imagen:
        pokemon.sprites.other['official-artwork'].front_default ||
        pokemon.sprites.front_default,
      tipos: pokemon.types.map((t: any) => t.type.name),
      estadisticas: pokemon.stats.map((s: any) => ({
        nombre: s.stat.name,
        base: s.base_stat
      })),
      altura: pokemon.height / 10,
      peso: pokemon.weight / 10,
      habilidades: pokemon.abilities.map((a: any) => a.ability.name),
      descripcion,
      generacion: species.generation?.name?.replace('generation-', 'Gen ').toUpperCase() || 'Desconocida',
      habitat: species.habitat?.name || 'Desconocido',
      tasaCaptura: species.capture_rate,
      evoluciones
    };
  }
}