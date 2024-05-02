const fs = require("fs");

async function eliminarClub(req, res) {
  try {
    const { id } = req.params;

    const data = fs.readFileSync("equipos.db.json", "utf-8");
    let equiposDB = JSON.parse(data);

    equiposDB = equiposDB.filter((club) => club.id !== parseInt(id));

    fs.writeFileSync("equipos.db.json", JSON.stringify(equiposDB, null, 2));

    console.log(`Club con ID ${id} eliminado correctamente.`);
    res.json({ message: `Club con ID ${id} eliminado correctamente.` });
  } catch (error) {
    console.error("Error al eliminar el club:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { eliminarClub };
