const baseUrl = "https://pokeapi.co/api/v2";

async function fetchPokemonList() {
    const url = `${baseUrl}/pokemon?limit=${state.limit}&offset=${state.offset}`;
    const response = await fetch(url);
    const data = await response.json();

    return Promise.all(data.results.map(fetchPokemonByUrl));
}

async function fetchPokemonByUrl(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();

    state.pokemonCache.set(data.id, data);
    return data;
}

async function fetchPokemonById(id) {
    if (state.pokemonCache.has(id)) return state.pokemonCache.get(id);

    const response = await fetch(`${baseUrl}/pokemon/${id}`);
    const data = await response.json();

    state.pokemonCache.set(data.id, data);
    return data;
}

async function fetchSpeciesById(id) {
    if (state.speciesCache.has(id)) return state.speciesCache.get(id);

    const response = await fetch(`${baseUrl}/pokemon-species/${id}`);
    const data = await response.json();

    state.speciesCache.set(id, data);
    return data;
}

async function fetchAllPokemonNames() {
    if (state.nameCache) return state.nameCache;

    const response = await fetch(`${baseUrl}/pokemon?limit=1302`);
    const data = await response.json();

    state.nameCache = data.results;
    return data.results;
}