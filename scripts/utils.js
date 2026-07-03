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

function getRadarStats(pokemon) {
    return pokemon.stats.map((item) => {
        return {
            name: formatStatName(item.stat.name),
            value: item.base_stat
        };
    });
}

function getRadarPoints(stats) {
    return stats.map((stat, index) => {
        const point = getRadarPoint(stat.value, index, stats.length);
        return `${point.x},${point.y}`;
    }).join(" ");
}

function getRadarPoint(value, index, length) {
    const angle = Math.PI * 2 * index / length - Math.PI / 2;
    const radius = Math.min(value, 150) / 150 * 105;

    return {
        x: 150 + Math.cos(angle) * radius,
        y: 150 + Math.sin(angle) * radius
    };
}

function formatStatName(name) {
    const names = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Sp. Atk",
        "special-defense": "Sp. Def",
        speed: "Speed"
    };

    return names[name] || name;
}

function getAbilities(pokemon) {
    return pokemon.abilities.map((item) => item.ability.name).join(", ");
}
