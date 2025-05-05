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

// Dibuja el Sunburst
svg.selectAll("path")
  .data(root.descendants())
  .join("path")
  .attr("d", arc)
  .attr("fill", d => d.depth === 0 ? "#333" : color(d.data.name))
  .on("click", (event, d) => {
    if (d.depth > 0) {
      updateSidebar(d.data); // ¡Función definida en sidebar.js!
    }
    // Zoom (código anterior)
  });