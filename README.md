# PokéLab — Aplicación Web Interactiva con Angular y PokéAPI

Aplicación web desarrollada en **Angular** para la asignatura de **Programación y Plataformas Web** (Universidad Politécnica Salesiana)[cite: 7]. El proyecto permite buscar Pokémon por nombre o número de Pokédex, consultar información detallada de su especie, simular su entrenamiento escalando estadísticas en tiempo real y navegar interactivamente por su cadena evolutiva mediante el consumo integrado de **PokéAPI**[cite: 8].

## Despliegue y Repositorio
- **Aplicación desplegada en Vercel:** https://practica02-dun.vercel.app
- **Repositorio en GitHub:** https://github.com/dan51122/Practica02

## Principales Funcionalidades
- **Buscador dinámico y consultas rápidas:** Permite buscar cualquier Pokémon por nombre exacto o ID de Pokédex, utilizar accesos directos (`Pikachu`, `Charizard`, `Lucario`, `Gengar`, `Eevee`, `Mewtwo`) o generar un Pokémon aleatorio.
- **Tarjeta interactiva y simulador de entrenamiento:** Muestra estadísticas base (`HP`, `Attack`, `Defense`, `Special Attack`, `Special Defense`, `Speed`), tipos, habilidades, altura y peso. Incluye controles interactivos (`Entrenar`, `Descansar`, `Reiniciar`) que gestionan la energía y recalculan en tiempo real las estadísticas según el nivel alcanzado (1 a 100).
- **Explorador de línea evolutiva:** Construye visualmente la cadena evolutiva completa del Pokémon consultado y permite hacer clic en cualquiera de sus fases para inspeccionarla dinámicamente.
- **Manejo de estados e interfaz responsiva:** Presenta indicadores visuales de carga durante las peticiones HTTP, validación de formularios y mensajes claros cuando el Pokémon buscado no existe o ocurre un error de consulta[cite: 8].

## Endpoints de PokéAPI Utilizados
La aplicación integra de forma encadenada tres recursos distintos de la API RESTful de PokéAPI[cite: 8]:

1. **`GET https://pokeapi.co/api/v2/pokemon/{name_or_id}`**  
   Obtiene los datos principales del Pokémon: identificador de Pokédex, nombre, arte oficial (*official-artwork*), tipos elementales, altura, peso, habilidades, estadísticas base y la URL de su especie[cite: 8].
2. **`GET https://pokeapi.co/api/v2/pokemon-species/{id}`**  
   Obtiene información biológica y contextual de la especie: descripción oficial de la Pokédex en español, generación a la que pertenece, hábitat natural, tasa de captura y el enlace hacia su cadena evolutiva[cite: 8].
3. **`GET https://pokeapi.co/api/v2/evolution-chain/{id}`**  
   Obtiene la estructura completa de evoluciones de la especie, permitiendo recorrer sus etapas y cargar cualquiera de ellas al interactuar con la interfaz[cite: 8].

## Arquitectura del Proyecto
- `src/app/services/pokeapi.ts`: Servicio encargado de encadenar las peticiones HTTP (`HttpClient` + `RxJS`) hacia los tres endpoints de PokéAPI y transformar los datos.
- `src/app/components/buscador/`: Componente con formulario reactivo, sugerencias rápidas y búsqueda aleatoria.
- `src/app/components/tarjeta-pokemon/`: Componente que renderiza la ficha técnica del Pokémon y ejecuta la lógica de entrenamiento y cálculo de estadísticas.
- `src/app/components/cadena-evolutiva/`: Componente interactivo que muestra las fases evolutivas y emite eventos de selección.

## Instalación y Ejecución Local
1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/dan51122/Practica02.git](https://github.com/dan51122/Practica02.git)