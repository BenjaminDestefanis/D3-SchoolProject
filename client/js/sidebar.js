export function updateSidebar(commandData) {
  document.getElementById("command-name").textContent = commandData.name;
  document.getElementById("command-description").textContent = 
    commandData.description || "Descripción no disponible.";
  document.getElementById("command-example").textContent = 
    commandData.example || "Ejemplo no disponible.";
  
  // Mostrar sidebar
  document.getElementById("sidebar").style.display = "block";
}

// Cerrar sidebar
document.getElementById("close-sidebar").addEventListener("click", () => {
  document.getElementById("sidebar").style.display = "none";
});

