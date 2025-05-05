// Polígonos de Thiessen
const data = {
    name: "Linux",
    children: [
      {
        name: "Archivos",
        children: [
          { name: "ls", size: 100 }, // "size" puede representar uso frecuente
          { name: "cd", size: 80 },
          { name: "cp", size: 60 }
        ]
      },
      {
        name: "Redes",
        children: [
          { name: "ping", size: 70 },
          { name: "ssh", size: 50 }
        ]
      }
    ]
  };


const width = 800, height = 800;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    // Colores por categoría (ajusta a tu tema)
    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

    const root = d3.hierarchy(data)
      .sum(d => d.size || 0); // Usa "size" para dimensionar los arcos

    partition(root);

    svg.selectAll("path")
      .data(root.descendants())
      .join("path")
      .attr("d", arc)
      .attr("fill", d => {
        if (d.depth === 0) return "#333"; // Raíz (Linux)
        return color(d.data.name);
      })
      .attr("opacity", 0.8)
      .on("click", (event, d) => { // Zoom al hacer clic
        svg.transition()
          .duration(750)
          .tween("scale", () => {
            const xd = d3.interpolate([d.x0, d.x1], [0, 2 * Math.PI]);
            const yd = d3.interpolate([d.y0, d.y1], [0, radius]);
            return t => {
              arc.startAngle(d => xd(t)[0])
                  .endAngle(d => xd(t)[1])
                  .innerRadius(d => yd(t)[0])
                  .outerRadius(d => yd(t)[1]);
              svg.selectAll("path").attr("d", arc);
            };
          });
      })
      .append("title") // Tooltip con descripción (puedes añadir más detalles)
      .text(d => `${d.data.name}\n${d.value || "Categoría"}`);

    // Etiquetas
    svg.selectAll("text")
      .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .join("text")
      .attr("transform", d => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data.name);