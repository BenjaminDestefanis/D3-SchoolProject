import { linuxCommands } from './data.js';
import { updateSidebar } from './sidebar.js';

const width = 700, height = 700;
const radius = Math.min(width, height) / 2;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width/2},${height/2})`);

const partition = d3.partition().size([2 * Math.PI, radius]);
const arc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

const root = d3.hierarchy(linuxCommands).sum(d => d.size || 0);
partition(root);

// Colores por categoría
const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, linuxCommands.children.length + 1));

// Dibuja el Sunburst (arcos)
svg.selectAll("path")
  .data(root.descendants())
  .join("path")
  .attr("d", arc)
  .attr("fill", d => d.depth === 0 ? "#333" : color(d.data.name))
  .attr("stroke", "#1a1a1a")
  .style("cursor", "pointer")
  .on("click", (event, d) => {
    if (d.depth > 0) updateSidebar(d.data);
    // Zoom (opcional)
  });

// Dibuja las etiquetas de texto
svg.selectAll("text")
  .data(root.descendants().filter(d => d.depth > 0 && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10)) // Filtra nodos pequeños
  .join("text")
  .attr("transform", d => {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI; // Ángulo medio en grados
    const y = (d.y0 + d.y1) / 2; // Radio medio
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`; // Alinea el texto
  })
  .attr("dy", "0.35em") // Ajuste vertical
  .attr("text-anchor", "middle") // Centra el texto
  .style("font-size", "12px")
  .style("fill", "#f0f0f0")
  .text(d => d.data.name);