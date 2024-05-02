export function mostrarEquipos(equipos) {
  const equiposContainer = document.getElementById("equiposContainer");
  equipos.forEach((equipo) => {
    const equipoCard = `
        <div class="col-md-4 mb-4">
        <div data-id="${equipo.id}" class="card">
            <img src="${equipo.crestUrl}" class="card-img-top" alt="${equipo.name} crest">
            <div class="card-body">
                <h5 class="card-title">${equipo.name}</h5>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger eliminarEquipo" data-id="${equipo.id}">Eliminar</button>
                    <button class="btn btn-info verEquipo"  data-id="${equipo.id}">Ver</button>
                </div>
            </div>
        </div>
    </div>
        `;
    equiposContainer.innerHTML += equipoCard;
  });
}

export async function verEquipo(id) {
  try {
    window.location.href = `team.html?id=${id}`;
  } catch (error) {
    console.error("Error al redireccionar:", error);
  }
}
