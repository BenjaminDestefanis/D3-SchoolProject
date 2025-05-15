/* 
    
    const data = {
      name: "Linux",
      children: [
        {
          name: "Archivos",
          children: [
            { name: "ls", size: 100 }, // "size" puede representar uso frecuente
            { name: "cd", size: 80 },
            { name: "cp", size: 60 },
            { name: "touch", size: 70},
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
    
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const nodes = [
      { id: "User", x: 100, y: 200 },
      { id: "Shell", x: 300, y: 200 },
      { id: "Kernel", x: 500, y: 200 },
      { id: "Hardware", x: 700, y: 200 },
    ];

    const links = [
      { source: "User", target: "Shell" },
      { source: "Shell", target: "Kernel" },
      { source: "Kernel", target: "Hardware" },
    ];

    // Draw links
    const link = svg.selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#00ffff")
      .attr("stroke-width", 2)
      .attr("x1", d => nodes.find(n => n.id === d.source).x)
      .attr("y1", d => nodes.find(n => n.id === d.source).y)
      .attr("x2", d => nodes.find(n => n.id === d.target).x)
      .attr("y2", d => nodes.find(n => n.id === d.target).y)
      .attr("stroke-opacity", 1);

    // Animation: blinking (intermittent) effect on lines
    function animateLinks() {
      link
        .transition()
        .duration(500)
        .attr("stroke-opacity", 0.2)
        .transition()
        .duration(500)
        .attr("stroke-opacity", 1)
        .on("end", animateLinks);
    }

    animateLinks();

    // Draw nodes
    const nodeGroup = svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    nodeGroup.append("circle")
      .attr("r", 30)
      .attr("fill", "#007acc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(1000)
      .ease(d3.easeSin)
      .attr("r", 40)
      .transition()
      .duration(1000)
      .attr("r", 30)
      .on("end", function repeat() {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("r", 40)
          .transition()
          .duration(1000)
          .attr("r", 30)
          .on("end", repeat);
      });

    nodeGroup.append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .text(d => d.id); */