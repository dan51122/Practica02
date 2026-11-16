# PokéLab — Aplicación Web Interactiva con Angular y PokéAPI

Aplicación web desarrollada en Angular que permite buscar Pokémon por nombre o número de Pokédex, analizar información biológica de su especie, entrenar sus estadísticas en tiempo real y navegar interactivamente por su línea evolutiva.

## Principales Funcionalidades
- **Búsqueda dinámica y aleatoria:** Consulta por nombre exacto, ID de Pokédex, sugerencias rápidas o generación aleatoria.
- **Simulador de entrenamiento:** Permite subir el nivel del Pokémon (1 a 100) gestionando su energía y recalculando en vivo las estadísticas reales a partir de las estadísticas base.
- **Explorador de evoluciones:** Renderiza la cadena evolutiva completa de la especie y permite hacer clic en cada fase para inspeccionarla.
- **Manejo de estados:** Indicadores visuales de carga, errores de red y notificaciones cuando un Pokémon no existe.

## Endpoints de PokéAPI Utilizados
1. `GET https://pokeapi.co/api/v2/pokemon/{name_or_id}`: Obtiene el sprite oficial, tipos, altura, peso, habilidades y estadísticas base (`HP`, `Attack`, `Defense`, `Special Attack`, `Special Defense`, `Speed`).
2. `GET https://pokeapi.co/api/v2/pokemon-species/{id}`: Obtiene la descripción oficial de la Pokédex en español, generación, hábitat, tasa de captura y el enlace a su cadena evolutiva.
3. `GET https://pokeapi.co/api/v2/evolution-chain/{id}`: Obtiene el árbol completo de evoluciones de la especie para permitir la navegación entre etapas evolutivas.

## Instalación y Ejecución Local
```bash
git clone [https://github.com/TU_USUARIO/pokelab-angular.git](https://github.com/TU_USUARIO/pokelab-angular.git)
cd pokelab-angular
npm install
ng serve -o