const listaPokemon = document.querySelector("#listaPokemon");

async function obtenerPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    for (let i = 1; i <= 50; i++) {
        await fetch(url + i)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
            .catch(() => {
                if (i <= 1) {
                    alert("No se pudo obtener los datos de la API")
                }
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
                        <img class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg" alt="img">
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


