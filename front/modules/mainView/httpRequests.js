import { mostrarEquipos } from "./domManipulation.js";
import { verEquipo } from "./domManipulation.js";

export async function agregarEquipo(event) {
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

export async function editarEquipo(event) {
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



export async function obtenerEquipos() {
    try {
        const response = await fetch("../back/equipos.db.json");
        const equipos = await response.json();
        mostrarEquipos(equipos);
        const botonesEliminar = document.querySelectorAll('.eliminarEquipo');
        botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            eliminarEquipo(id);
            console.log("eliminado")
        });  
    });
    const botonesVer = document.querySelectorAll('.verEquipo');
        botonesVer.forEach((boton) => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            verEquipo(id);
            console.log("verEquipo")
        });
        
    });
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
    }
}

export function eliminarEquipo(equipoId) {
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
