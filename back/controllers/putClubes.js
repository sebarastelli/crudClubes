const fs = require("fs");

async function editarClub(req, res) {
  try {
    const club = req.body;
    console.log(req.body);
    let equiposDB = [];

    if (fs.existsSync("equipos.db.json")) {
      const data = fs.readFileSync("equipos.db.json", "utf-8");
      equiposDB = JSON.parse(data);
    }

    const clubNuevo = {
      name: club.name,
      crestUrl: club.crestUrl,
      address: club.address,
      area: club.area,
      id: club.id,
    };

    const indexEquipoExistente = equiposDB.findIndex(
      (e) => e.id === parseInt(clubNuevo.id)
    );
    console.log(indexEquipoExistente);
    if (indexEquipoExistente !== -1) {
      equiposDB[indexEquipoExistente] = {
        name: clubNuevo.name,
        crestUrl: clubNuevo.crestUrl,
        address: clubNuevo.address,
        area: clubNuevo.area,
        id: equiposDB[indexEquipoExistente].id,
      };
    }

    fs.writeFileSync("equipos.db.json", JSON.stringify(equiposDB, null, 2));
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
  }
}

module.exports = { editarClub };
