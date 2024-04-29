import { actualizarEquipo } from "./actualizarEquipo.js";

async function obtenerEquipoPorId(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/obtenerClub/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Equipo no encontrado");
      } else {
        throw new Error("Error al obtener el equipo");
      }
    }

    const equipo = await response.json();
    return equipo;
  } catch (error) {
    console.error("Error al obtener el equipo:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const verEquipoContainer = document.getElementById("verEquipoContainer");
  const urlParams = new URLSearchParams(window.location.search);
  const equipoId = urlParams.get("id");
  if (equipoId) {
    try {
      const equipo = await obtenerEquipoPorId(equipoId);
      const equipoCard = `
            <div class="col-md-4 mb-4 mt-5">
                <div data-id="${equipo.id}" class="card">
                    <img src="${equipo.crestUrl}" class="card-img-top" alt="${equipo.name} crest">
                    <div class="card-body">
                        <h5 class="card-title">${equipo.name}</h5>
                        <p class="card-text"><strong>País:</strong> ${equipo.area}</p>
                        <p class="card-text"><strong>Dirección:</strong> ${equipo.address}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary editarEquipo" id="displayForm" data-id="${equipo.id}">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;

      verEquipoContainer.innerHTML = equipoCard;
    } catch (error) {
      console.error("Error al obtener el equipo:", error);
      verEquipoContainer.innerHTML = `<p>${error.message}</p>`;
    }
  } else {
    console.error("ID del equipo no proporcionado");
  }
  const volver = document.getElementById("volver");
  volver.addEventListener("click", function(){
    window.location.href = "index.html"
  })
  const displayForm = document.querySelector(".editarEquipo");
  const formulario = document.getElementById("form");
  displayForm.addEventListener("click", function () {
    if (
      formulario.style.display === "none" ||
      formulario.style.display === ""
    ) {
      formulario.style.display = "block";
    } else {
      formulario.style.display = "none";
    }
  });
  const editarClub = document.getElementById("editClub");
  editarClub.addEventListener("click", function (e) {
    actualizarEquipo(e, equipoId);
  });
});
