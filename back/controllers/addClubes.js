const fs = require('fs');

async function crearClub(req, res) {
  try {
    const club = req.body;
    
    let equiposDB = [];
 
    if (fs.existsSync('equipos.db.json')) {
      const data = fs.readFileSync('equipos.db.json', 'utf-8');
      equiposDB = JSON.parse(data);
    }
    
    const clubNuevo = {
      name: club.name,
      crestUrl: club.crestUrl,
      address: club.address,
      area: club.area, 
      id: 9999, 
    };
    
    const equipoExistente = equiposDB.find((e) => e.id === clubNuevo.id);
    
    if (equipoExistente) {
      equipoExistente.name = clubNuevo.name;
      equipoExistente.crestUrl = clubNuevo.crestUrl;
      equipoExistente.address = clubNuevo.address;
      equipoExistente.area = clubNuevo.area;
    } else {
      equiposDB.push({
        id: clubNuevo.id,
        name: clubNuevo.name,
        crestUrl: clubNuevo.crestUrl,
        address: clubNuevo.address,
        area: clubNuevo.area,  
      });
    }
    
    fs.writeFileSync('equipos.db.json', JSON.stringify(equiposDB, null, 2));
    
  } catch (error) {
    console.error('Error al obtener los equipos:', error);
  }
}

module.exports = { crearClub };