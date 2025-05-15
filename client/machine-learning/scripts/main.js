// Inicialización
const color = d3.scaleOrdinal(config.colorScheme);

// Crear jerarquía
const hierarchy = d3.hierarchy(config.data)
  .sum(d => d.value || 0)
  .sort((a, b) => (b.value || 0) - (a.value || 0));

const root = d3.treemap()
  .size([config.width, config.height])
  .padding(1)
  (hierarchy);

// Crear SVG
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", config.width)
  .attr("height", config.height)
  .style("cursor", "pointer")
  .on("click", (event) => zoom(event, root));

// Dibujar nodos
function drawNodes(currentRoot) {
  const nodes = svg.selectAll(".node")
    .data(currentRoot.descendants(), d => d.data.name);

  // Eliminar nodos no necesarios
  nodes.exit().remove();

  // Nuevos nodos
  const nodeEnter = nodes.enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x0},${d.y0})`)
    .on("click", (event, d) => {
      event.stopPropagation();
      zoom(event, d);
    });

  nodeEnter.append("rect")
    .attr("fill", d => color(d.depth))
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0);

  nodeEnter.append("foreignObject")
    .attr("width", d => Math.max(0, d.x1 - d.x0 - 2))
    .attr("height", d => Math.max(0, d.y1 - d.y0 - 2))
    .append("xhtml:div")
    .attr("class", "node-label")
    .html(d => `
      <div>${d.data.name}</div>
      ${d.data.value ? `<div class="node-value">${d.data.value}</div>` : ''}
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

// Función de zoom
function zoom(event, d) {
  const newRoot = d === root ? root : d;

  svg.transition()
    .duration(event.altKey ? 7500 : 750)
    .call(svg => {
      svg.selectAll(".node")
        .attr("transform", n => {
          const x = (n.x0 - newRoot.x0) / (newRoot.x1 - newRoot.x0) * config.width;
          const y = (n.y0 - newRoot.y0) / (newRoot.y1 - newRoot.y0) * config.height;
          return `translate(${x},${y})`;
        })
        .select("rect")
        .attr("width", n => (n.x1 - n.x0) / (newRoot.x1 - newRoot.x0) * config.width)
        .attr("height", n => (n.y1 - n.y0) / (newRoot.y1 - newRoot.y0) * config.height);
    });

  drawNodes(newRoot);
}

// Dibujar inicial
drawNodes(root);