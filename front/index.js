document.addEventListener('DOMContentLoaded', function() {
    const botonMostrar = document.getElementById('formDisplay');
    const formulario = document.getElementById('form');
    const addClub = document.getElementById("addClub");
    

    addClub.addEventListener("click", agregarEquipo);

    botonMostrar.addEventListener('click', function() {
        if (formulario.style.display === 'none' || formulario.style.display === '') {
            formulario.style.display = 'block';
        } else {
            formulario.style.display = 'none';
        }
    });
});

async function agregarEquipo(event) {
    event.preventDefault();
    
    try {
        const teamName = document.getElementById("name");
        const teamURL = document.getElementById("crestUrl");
        const teamArea = document.getElementById("area");
        const teamAddress = document.getElementById("address");
        
        const newClub = {
            name: teamName.value,
            crestUrl: teamURL.value,
            area: teamArea.value,
            address: teamAddress.value,
        };

        console.log(newClub);

        const response = await fetch('http://localhost:3000/api/crearClub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClub)
        });

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

async function obtenerEquipos() {
    try {
        const response = await fetch("../back/equipos.db.json");
        const equipos = await response.json();
        mostrarEquipos(equipos);
        const botonesEliminar = document.querySelectorAll('.eliminarEquipo');
        botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            eliminarEquipo(id);
            console.log("hola")
        });
    });
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
    }
}

function mostrarEquipos(equipos) {
    const equiposContainer = document.getElementById('equiposContainer');
    equipos.forEach((equipo) => {
        const equipoCard = `
        <div class="col-md-4 mb-4">
        <div data-id="${equipo.id}" class="card">
            <img src="${equipo.crestUrl}" class="card-img-top" alt="${equipo.name} crest">
            <div class="card-body">
                <h5 class="card-title">${equipo.name}</h5>
                <p class="card-text"><strong>País:</strong> ${equipo.area}</p>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger eliminarEquipo" data-id="${equipo.id}">Eliminar</button>
                    <button class="btn btn-primary editar-equipo" data-id="${equipo.id}">Editar</button>
                    <button class="btn btn-info ver-equipo" data-id="${equipo.id}">Ver</button>
                </div>
            </div>
        </div>
    </div>
        `;
       equiposContainer.innerHTML += equipoCard;
    });
}


function eliminarEquipo(equipoId) {
    console.log(`Eliminar equipo con ID: ${equipoId}`);
    fetch(`http://localhost:3000/api/eliminarClub/${equipoId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Equipo eliminado:', data);
    })
    .catch(error => {
        console.error('Error al eliminar el equipo:', error);
    });
}

obtenerEquipos()