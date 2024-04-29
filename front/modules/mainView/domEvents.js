import { agregarEquipo } from "./httpRequests.js";

export function setupDOMEvents() {
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
}
