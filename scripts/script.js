function init() {
    const loadMoreButton = document.getElementById("loadMoreButton");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    loadMoreButton.addEventListener("click", loadAndRenderPokemon);
    searchButton.addEventListener("click", searchPokemon);
    searchInput.addEventListener("input", resetSearch);
    searchInput.addEventListener("keydown", handleSearchEnter);

    loadAndRenderPokemon();
}

function handleSearchEnter(event) {
    if (event.key === "Enter") searchPokemon();
}