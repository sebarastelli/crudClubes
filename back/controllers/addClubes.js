const fs = require('fs');

async function crearClub(req, res) {
  try {
    const club = req.body;
    
    let equiposDB = [];
 
    if (fs.existsSync('equipos.db.json')) {
      const data = fs.readFileSync('equipos.db.json', 'utf-8');
      equiposDB = JSON.parse(data);
    }
    
    let randomId;
    do {
      randomId = Math.floor(Math.random() * 100000); 
    } while (equiposDB.some(equipo => equipo.id === randomId)); 
    
    const clubNuevo = {
      name: club.name,
      crestUrl: club.crestUrl,
      address: club.address,
      area: club.area, 
      id: randomId, 
    };
    
    const equipoExistenteIndex = equiposDB.findIndex(e => e.id === clubNuevo.id);
    
    if (equipoExistenteIndex !== -1) {
      equiposDB[equipoExistenteIndex] = clubNuevo; 
    } else {
      equiposDB.push(clubNuevo); 
    }
    
    fs.writeFileSync('equipos.db.json', JSON.stringify(equiposDB, null, 2));
    
  } catch (error) {
    console.error('Error al obtener los equipos:', error);
  }
}

module.exports = { crearClub };