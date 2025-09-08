const detallePokemon = document.querySelector("#detallePokemon");

const listaPokemon = document.querySelector("#listaPokemon");

async function obtenerPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    for (var i = 1; i <= 40; i++) {
        await fetch(url + i)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
            .catch(() => {
                // if (i <= 1) {
                //     alert("No se pudo obtener los datos de la API")
                // }
            })
            .finally(console.log("Finally de la API de Pokemon"));
    }
}

obtenerPokemon();


function mostrarPokemon(data) {

    // Creamos un map de tipos ya que contiene un array
    let tipos = data.types.map((type) => `<h5 class= "tipo">${type.type.name}</h5>`);

    // Permite juntar todos los elementos de array en un string
    tipos.join(' ');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="img/back.webp" alt="img"/>
                </div>
                <div class="flip-card-back">
                    <div class="card-content">
                        <div class="pokemon-number">
                            <h3 class="pokemon-id">${data.order}</h3>
                        </div>
                        <h1 class="pokemon-name">${data.name}</h1>
                        <a href="/detalles.html?id=${data.id}">
                            <img class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" alt="img">
                        </a>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stat">
                        <h6 class="stat">${data.height} mts.</h6>
                        <h6 class="stat">${data.weight} kg.</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    listaPokemon.append(div);
}


// Obtener el ID de la URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

if (pokemonId) {
    obtenerUnPokemon(pokemonId).then(pokemon => {
        if (pokemon) {
            mostrarDetallePokemon(pokemon);
        }
    });
}

// Función para obtener un Pokémon
async function obtenerUnPokemon(identificador) {
    const url = `https://pokeapi.co/api/v2/pokemon/${identificador}/`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pokémon no encontrado: ${identificador}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
        alert(`No se pudo obtener el Pokémon: ${identificador}`);
        return null;
    }
}

function mostrarDetallePokemon(data) {
    // Mapear los tipos
    let tipos = data.types.map((type) => `<h5 class="tipo">${type.type.name}</h5>`);
    tipos = tipos.join(' ');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="flip-card-one">
            <div class="container">
                <div class="flip-card-inner">
                    <div class="card-content">
                        <div class="pokemon-number">
                            <h3 class="pokemon-id">${data.order}</h3>
                        </div>
                        <h1 class="pokemon-name">${data.name}</h1>
                        <img class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" alt="${data.name}">
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stat">
                            <h6 class="stat">${data.height} mts.</h6>
                            <h6 class="stat">${data.weight} kg.</h6>
                        </div>
                    </div>
                </div>
                <div class="center"> 
                    <button class="btn btn-dark" onclick="window.history.back()">Volver</button>
                </div>
            </div>
        </div>
    `;

    detallePokemon.append(div);
}