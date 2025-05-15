import { linuxCommands } from './data.js';
import { updateSidebar } from './sidebar.js';

const width = 700, height = 700;
const radius = Math.min(width, height) / 2;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

const partition = d3.partition().size([2 * Math.PI, radius]);

const arc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

const root = d3.hierarchy(linuxCommands)
  .sum(d => d.size || 0)
  .sort((a, b) => b.value - a.value);

partition(root);

const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, root.children.length + 1));

root.each(d => d.current = d);

const g = svg.append("g");

const path = g.append("g")
  .selectAll("path")
  .data(root.descendants())
  .join("path")
  .attr("fill", d => {
    while (d.depth > 1) d = d.parent;
    return color(d.data.name);
  })
  .attr("d", d => arc(d.current))
  .on("click", clicked)
  .style("cursor", "pointer")
  .attr("stroke", "#fff");

const label = g.append("g")
  .attr("pointer-events", "none")
  .attr("text-anchor", "middle")
  .selectAll("text")
  .data(root.descendants())
  .join("text")
  .attr("dy", "0.35em")
  .attr("fill", "#f0f0f0")
  .style("font-size", "12px")
  .style("visibility", d => labelVisible(d) ? "visible" : "hidden")
  .attr("transform", d => labelTransform(d))
  .text(d => d.data.name);


function updateBreadcrumb(node) {
  const sequence = node.ancestors().reverse().map(d => d.data.name);
  document.getElementById("breadcrumb").textContent = sequence.join(" / ");
}

function clicked(event, p) {
  root.each(d => {
    d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.y0),
      y1: Math.max(0, d.y1 - p.y0)
    };
  });

  const t = g.transition().duration(750);

  // Arcos
  clicked(null, root); // <- Llama al zoom inicial después de crear todo

  path.transition(t)
    .tween("data", d => {
      const i = d3.interpolate(d.current, d.target);
      return t => d.current = i(t);
    })
    .attrTween("d", d => () => arc(d.current));

  // Etiquetas
  label
    .transition(t)
    .attr("transform", d => labelTransform(d.current))
    .style("visibility", d => labelVisible(d.current) ? "visible" : "hidden");

  if (p.depth > 0) updateSidebar(p.data);

  updateBreadcrumb(p);
}

// --- Funciones auxiliares ---

function labelVisible(d) {
  return d.y1 <= radius && d.y0 >= 0 && (d.x1 - d.x0) > 0.03;
}

function labelTransform(d) {
  const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
  const y = (d.y0 + d.y1) / 2;
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}
