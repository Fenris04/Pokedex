const searchInput = document.getElementById("searchInput");

async function searchPokemon() {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 3) return;
    const matches = await getSearchMatches(query);

    handleSearchResults(matches);
}

function resetSearch() {
    if (searchInput.value.trim() !== "") return;

    state.visiblePokemon = state.allPokemon;
    renderPokemonCards(state.visiblePokemon);
    showLoadMoreButton();
}

async function getSearchMatches(query) {
    const names = await fetchAllPokemonNames();
    const matches = names.filter((pokemon) => pokemon.name.includes(query));

    return Promise.all(matches.slice(0, 40).map(fetchPokemonFromResult));
}

async function fetchPokemonFromResult(result) {
    const id = getPokemonIdFromUrl(result.url);

    return fetchPokemonById(id);
}

function handleSearchResults(matches) {
    state.visiblePokemon = matches;
    hideLoadMoreButton();

    matches.length ? renderPokemonCards(matches) : renderNotFoundMessage();
}