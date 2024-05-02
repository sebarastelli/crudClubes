import { setupDOMEvents } from "./modules/mainView/domEvents.js";
import { obtenerEquipos } from "./modules/mainView/httpRequests.js";

document.addEventListener("DOMContentLoaded", () => {
  setupDOMEvents();
  obtenerEquipos();
});
