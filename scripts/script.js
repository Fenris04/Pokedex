function init() {
    const loadMoreButton = document.getElementById("loadMoreButton");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const clearButton = document.getElementById("clearSearchButton");

    loadMoreButton.addEventListener("click", loadAndRenderPokemon);
    searchButton.addEventListener("click", searchPokemon);
    searchInput.addEventListener("keydown", handleSearchEnter);
    searchInput.addEventListener("input", handleSearchInput);
    clearButton.addEventListener("click", clearSearch);

    loadAndRenderPokemon();
}

function handleSearchEnter(event) {
    if (event.key === "Enter" && isSearchReady()) searchPokemon();
    if (event.key === "Escape") clearSearch();
}

function handleSearchInput() {
    toggleClearButton();
    toggleSearchHint();
    toggleSearchButton();

    if (isSearchInputEmpty()) resetSearch();
}

function clearSearch() {
    const input = document.getElementById("searchInput");

    input.value = "";
    handleSearchInput();
    resetSearch();
}

function toggleClearButton() {
    const clearButton = document.getElementById("clearSearchButton");

    clearButton.classList.toggle("hidden", isSearchInputEmpty());
}

function toggleSearchHint() {
    const hint = document.getElementById("searchHint");

    hint.classList.toggle("hidden", !shouldShowSearchHint());
}

function toggleSearchButton() {
    const searchButton = document.getElementById("searchButton");

    searchButton.disabled = !isSearchReady();
}

function shouldShowSearchHint() {
    const input = document.getElementById("searchInput");

    return input.value.length > 0 && input.value.length < 3;
}

function isSearchReady() {
    const input = document.getElementById("searchInput");

    return input.value.trim().length >= 3;
}

function isSearchInputEmpty() {
    const input = document.getElementById("searchInput");

    return input.value.trim().length === 0;
}