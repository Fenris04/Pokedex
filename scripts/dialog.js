const dialog = document.getElementById("pokemonDialog");

async function openDialog(id) {
    const pokemon = await fetchPokemonById(id);
    const species = await fetchSpeciesByPokemon(pokemon);

    state.currentDialogIndex = getPokemonIndex(id);
    dialog.innerHTML = dialogTemplate(pokemon, getFlavorText(species));

    openDialogElement();
    addDialogEvents();
}

function openDialogElement() {
    dialog.showModal();
    document.body.classList.add("dialogOpen");
}

function closeDialog() {
    dialog.close();
    document.body.classList.remove("dialogOpen");
}

function addDialogEvents() {
    addCloseDialogEvent();
    addPreviousDialogEvent();
    addNextDialogEvent();
}

function addCloseDialogEvent() {
    dialog.querySelector("[data-id='close-dialog-button']").addEventListener("click", closeDialog);
}

function addPreviousDialogEvent() {
    dialog.querySelector("[data-id='prev-button']").addEventListener("click", showPreviousPokemon);
}

function addNextDialogEvent() {
    dialog.querySelector("[data-id='next-button']").addEventListener("click", showNextPokemon);
}

function showPreviousPokemon() {
    const index = state.currentDialogIndex - 1;
    const newIndex = index < 0 ? state.visiblePokemon.length - 1 : index;

    openDialog(state.visiblePokemon[newIndex].id);
}

function showNextPokemon() {
    const index = state.currentDialogIndex + 1;
    const newIndex = index >= state.visiblePokemon.length ? 0 : index;

    openDialog(state.visiblePokemon[newIndex].id);
}

function getPokemonIndex(id) {
    return state.visiblePokemon.findIndex((pokemon) => pokemon.id === id);
}

function getFlavorText(species) {
    const entry = species.flavor_text_entries.find(isEnglishEntry);

    return entry ? cleanText(entry.flavor_text) : "No description available.";
}

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
});