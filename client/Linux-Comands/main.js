const width = 800;
const radius = width / 2;

const root = d3.hierarchy(linuxData)
  .sum(d => d.children ? 0 : 1)
  .sort((a, b) => b.value - a.value);

const partition = d3.partition().size([2 * Math.PI, radius]);
partition(root);

const arc = d3.arc()
  .startAngle(d => d.x0)
  .endAngle(d => d.x1)
  .innerRadius(d => d.y0)
  .outerRadius(d => d.y1);

const svg = d3.select("#chart")
  .attr("viewBox", [0, 0, width, width])
  .style("font", "12px sans-serif");

const g = svg.append("g")
  .attr("transform", `translate(${radius},${radius})`);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const path = g.selectAll("path")
  .data(root.descendants())
  .join("path")
  .attr("fill", d => {
    while (d.depth > 1) d = d.parent;
    return color(d.data.name);
  })
  .attr("d", arc)
  .on("click", clicked);

path.append("title")
  .text(d => d.ancestors().map(d => d.data.name).reverse().join(" → "));

// Etiquetas
const label = g.selectAll("text")
  .data(root.descendants())
  .join("text")
  .attr("dy", "0.35em")
  .attr("fill", "#000")
  .attr("text-anchor", "middle")
  .style("pointer-events", "none")
  .text(d => d.data.name)
  .attr("transform", d => labelTransform(d))
  .attr("display", d => d.depth ? null : "none");

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

  path.transition(t)
    .tween("data", d => {
      const i = d3.interpolate(d.current || d, d.target);
      return t => { d.current = i(t); };
    })
    .attrTween("d", d => () => arc(d.current));

  label.transition(t)
    .attr("transform", d => labelTransform(d.target))
    .attr("display", d => d.target.y0 >= 0.1 ? null : "none");
}

function labelTransform(d) {
  const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
  const y = (d.y0 + d.y1) / 2;
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

function resetZoom() {
  clicked(null, root);
}
