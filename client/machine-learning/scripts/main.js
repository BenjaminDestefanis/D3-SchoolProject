// Inicialización
const color = d3.scaleOrdinal(config.colorScheme);
let currentRoot;

// Crear SVG
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", config.width)
  .attr("height", config.height)
  .style("cursor", "pointer");

// Función de zoom
function zoom(event, d) {
  // Si se hace clic en el nodo raíz o se quiere resetear
  if (!d || d === currentRoot) {
    currentRoot = d3.hierarchy(config.data)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));
    
    d3.treemap()
      .size([config.width, config.height])
      .padding(1)
      (currentRoot);
  } else {
    currentRoot = d;
  }

  // Transición suave
  svg.transition()
    .duration(event && event.altKey ? 7500 : 750)
    .call(svg => {
      svg.selectAll(".node")
        .attr("transform", n => {
          const x = (n.x0 - currentRoot.x0) / (currentRoot.x1 - currentRoot.x0) * config.width;
          const y = (n.y0 - currentRoot.y0) / (currentRoot.y1 - currentRoot.y0) * config.height;
          return `translate(${x},${y})`;
        })
        .select("rect")
        .attr("width", n => (n.x1 - n.x0) / (currentRoot.x1 - currentRoot.x0) * config.width)
        .attr("height", n => (n.y1 - n.y0) / (currentRoot.y1 - currentRoot.y0) * config.height);
    });

  drawNodes(currentRoot);
}

// Función para dibujar nodos
function drawNodes(root) {
  const nodes = svg.selectAll(".node")
    .data(root.descendants(), d => d.data.name + d.depth);

  // Eliminar nodos no necesarios
  nodes.exit().remove();

  // Nuevos nodos
  const nodeEnter = nodes.enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x0},${d.y0})`)
    .attr("depth", d => d.depth)
    .on("click", function(event, d) {
      event.stopPropagation();
      zoom(event, d);
    });

  nodeEnter.append("rect")
    .attr("fill", d => color(d.data.name))
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0);

  nodeEnter.append("foreignObject")
    .attr("width", d => Math.max(0, d.x1 - d.x0 - 2))
    .attr("height", d => Math.max(0, d.y1 - d.y0 - 2))
    .append("xhtml:div")
    .attr("class", "node-label")
    .html(d => `
      <div>${d.data.name}</div>
      ${d.data.value ? `<div class="node-value">${d.data.value} unidades</div>` : ''}
    `);

  // Actualizar nodos existentes
  nodes.merge(nodeEnter)
    .transition()
    .duration(750)
    .attr("transform", d => `translate(${d.x0},${d.y0})`)
    .select("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0);
}

// Función para manejar redimensionamiento
function handleResize() {
  config.width = window.innerWidth;
  config.height = window.innerHeight;
  
  svg.attr("width", config.width)
     .attr("height", config.height);
  
  zoom(); // Vuelve a calcular el layout
}

// Event listeners
svg.on("click", (event) => zoom(event));
window.addEventListener('resize', handleResize);

// Inicialización
zoom(); // Dibuja el treemap inicial