const grid = document.getElementById("pokemonGrid");
const loader = document.getElementById("loadingScreen");
const loadButton = document.getElementById("loadMoreButton");

async function loadAndRenderPokemon() {
    if (state.isLoading) return;

    setLoading(true);
    await wait(500);

    const pokemon = await fetchPokemonList();

    updatePokemonState(pokemon);
    renderPokemonCards(state.visiblePokemon);
    setLoading(false);
}

function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function updatePokemonState(pokemon) {
    state.allPokemon.push(...pokemon);
    state.visiblePokemon = state.allPokemon;
    state.offset += state.limit;
}

function renderPokemonCards(pokemonList) {
    grid.innerHTML = pokemonList.map(pokemonCardTemplate).join("");
    addCardEvents();
}

function renderNotFoundMessage() {
    grid.innerHTML = `<p class="notFoundText" data-id="not-found">No match found.</p>`;
}

function setLoading(isLoading) {
    state.isLoading = isLoading;
    loader.classList.toggle("hidden", !isLoading);
    loadButton.disabled = isLoading;
}

function hideLoadMoreButton() {
    loadButton.classList.add("hidden");
}

function showLoadMoreButton() {
    loadButton.classList.remove("hidden");
}

function addCardEvents() {
    document.querySelectorAll("[data-id='card']").forEach(addCardEvent);
}

function addCardEvent(card) {
    card.addEventListener("click", () => {
        openDialog(Number(card.dataset.pokemonId));
    });
}