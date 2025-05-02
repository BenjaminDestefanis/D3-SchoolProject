const data = [
    { date: "2024-03-01", grade: 6.5 },
    { date: "2024-04-01", grade: 7.0 },
    { date: "2024-05-01", grade: 8.0 },
    { date: "2024-06-01", grade: 7.5 },
    { date: "2024-07-01", grade: 9.0 }
  ];
  
  const svg = d3.select("svg");
  const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;
  
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  const parseDate = d3.timeParse("%Y-%m-%d");
  
  data.forEach(d => {
    d.date = parseDate(d.date);
    d.grade = +d.grade;
  });
  
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);
  
  const y = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);
  
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.grade));
  
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(5));
  
  g.append("g")
    .call(d3.axisLeft(y));
  
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#007acc")
    .attr("stroke-width", 2)
    .attr("d", line);
  
  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.grade))
    .attr("r", 4)
    .attr("fill", "#007acc");
  