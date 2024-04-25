const express = require("express");
const router = express.Router();
const getClubes = require("../controllers/getClubes.js");
const addClubes = require("../controllers/addClubes.js");
const putClubes = require("../controllers/putClubes.js");
const deleteClubes = require("../controllers/deleteClubes.js")

router.get("/api/clubes", getClubes.obtenerEquiposIngleses);
router.post("/api/crearClub", addClubes.crearClub);
router.put("/api/editarClub", putClubes.editarClub);
router.delete("/api/eliminarClub/:id", deleteClubes.eliminarClub)

module.exports = router;