document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    fetch('jugadores.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const results = data.filter(jugador => jugador.nombre.toLowerCase().includes(query));
            displayResults(results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron jugadores.</p>';
        return;
    }
    
    results.forEach((jugador) => {
        const card = document.createElement('div');
        card.className = 'card my-2';
        card.innerHTML = `
            <div class="card-body">
                <h5>${jugador.nombre}</h5>
                <img src="${jugador.imagen}" alt="Imagen de ${jugador.nombre}">
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `jugador.html?id=${jugador.id}`; // Redirige a jugador.html con el ID en la URL
        });
        resultsContainer.appendChild(card);
    });
}



document.addEventListener('DOMContentLoaded', function() {
    fetch('jugadores.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
