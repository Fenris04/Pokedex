function formatPokemonId(id) {
    return String(id).padStart(3, "0");
}

function getPokemonImage(pokemon) {
    return pokemon.sprites.other["official-artwork"].front_default;
}

function getPokemonIdFromUrl(url) {
    return Number(url.split("/").filter(Boolean).pop());
}

function cleanText(text) {
    return text.replaceAll("\n", " ").replaceAll("\f", " ");
}

function isEnglishEntry(entry) {
    return entry.language.name === "en";
}