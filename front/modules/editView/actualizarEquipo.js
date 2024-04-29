export async function actualizarEquipo(e, equipoId) {
  e.preventDefault();
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
      id: equipoId,
    };

    console.log(newClub);

    const response = await fetch("http://localhost:3000/api/editarClub", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClub),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
