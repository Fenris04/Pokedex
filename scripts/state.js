const state = {
    limit: 20,
    offset: 0,
    isLoading: false,
    allPokemon: [],
    visiblePokemon: [],
    currentDialogIndex: 0,
    pokemonCache: new Map(),
    speciesCache: new Map(),
    nameCache: null
};