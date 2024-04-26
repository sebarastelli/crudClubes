const fs = require('fs');
const axios = require('axios');

const API_KEY = '2f76c75a4fc7448794f6ff0ebc4c300d';

async function obtenerEquiposIngleses(req, res) {
  try {
    const response = await axios.get('http://api.football-data.org/v4/competitions/PL/teams', {
      headers: {
        'X-Auth-Token': API_KEY
      }
    });

    const equiposAPI = response.data.teams;
    let equiposDB = [];
    if (fs.existsSync('equipos.db.json')) {
      const data = fs.readFileSync('equipos.db.json', 'utf-8');
      equiposDB = JSON.parse(data);
    }

    equiposAPI.forEach((equipo) => {
      const equipoExistente = equiposDB.find((e) => e.id === equipo.id);
      if (equipoExistente) {
        equipoExistente.name = equipo.name;
        equipoExistente.crestUrl = equipo.crestUrl;
        equipoExistente.address = equipo.address;
        equipoExistente.area = equipo.area.name;
      } else {
        equiposDB.push({
          id: equipo.id,
          name: equipo.name,
          crestUrl: equipo.crestUrl,
          address: equipo.address,
          area: equipo.area.name,  
        });
      }
    });

    fs.writeFileSync('equipos.db.json', JSON.stringify(equiposDB, null, 2));
    console.log('Datos actualizados en equipos.db.json');
    res.json(equiposDB);
  } catch (error) {
    console.error('Error al obtener los equipos:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
async function obtenerEquipoPorId(req, res) {
  const equipoId = req.params.id; // Obtener el ID del equipo desde los parámetros de la solicitud
  try {
    // Primero, intenta buscar el equipo en la base de datos local
    let equiposDB = [];
    if (fs.existsSync('equipos.db.json')) {
      const data = fs.readFileSync('equipos.db.json', 'utf-8');
      equiposDB = JSON.parse(data);
    }

    const equipoDB = equiposDB.find((equipo) => equipo.id == equipoId);

    if (equipoDB) {
      // Si el equipo está en la base de datos local, devuelve el equipo
      res.json(equipoDB);
    } else {
      // Si el equipo no está en la base de datos local, intenta obtenerlo de la API
      const response = await axios.get(`http://api.football-data.org/v2/teams/${equipoId}`, {
        headers: {
          'X-Auth-Token': API_KEY
        }
      });

      const equipoAPI = response.data;
      
      equiposDB.push({
        id: equipoAPI.id,
        name: equipoAPI.name,
        crestUrl: equipoAPI.crestUrl,
        address: equipoAPI.address,
        area: equipoAPI.area.name
      });

      fs.writeFileSync('equipos.db.json', JSON.stringify(equiposDB, null, 2));
      console.log('Equipo añadido a equipos.db.json');
      
      res.json({
        id: equipoAPI.id,
        name: equipoAPI.name,
        crestUrl: equipoAPI.crestUrl,
        address: equipoAPI.address,
        area: equipoAPI.area.name
      });
    }
  } catch (error) {
    console.error('Error al obtener el equipo:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { obtenerEquiposIngleses, obtenerEquipoPorId };