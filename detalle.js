// detalle.js

// Obtener el ID del jugador desde la URL
const params = new URLSearchParams(window.location.search);
const playerId = params.get('id');

fetch('jugadores.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la carga del archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        const jugador = data.find(j => j.id == playerId); 
        if (jugador) {
            displayPlayerDetails(jugador);
        } else {
            document.getElementById('playerDetails').innerHTML = '<p>Jugador no encontrado.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

function displayPlayerDetails(jugador) {
    document.getElementById('playerName').textContent = jugador.nombre;
    document.getElementById('playerDetails').innerHTML = `
        <div class="card">
            <div class="card-body">
                <img src="${jugador.imagen}" alt="Imagen de ${jugador.nombre}" ">
                <p><strong>Posición:</strong> ${jugador.posicion}</p>
                <p><strong>Equipo:</strong> ${jugador.equipo}</p>
                <p><strong>PPP:</strong> ${jugador.pts}</p>
                <p><strong>Campeon:</strong> ${jugador.campeon}</p>
            </div>
        </div>
    `;
}
