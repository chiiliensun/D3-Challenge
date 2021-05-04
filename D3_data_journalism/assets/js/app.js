// @TODO: YOUR CODE HERE!

// starting with D3 02-Activities-03-Par_BarChart_From_CSV
// Define SVG area dimensions
const svgWidth = 960;
const svgHeight = 560;

// Define the chart's margins as an object
const chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
const chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("D3_data_journalism/assets/data/data.csv").then(function(censusData) {

  // Log the tvData
  console.log(censusData);

  // Cast the hours value to a number for each piece of tvData
  censusData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
  });

  // Create a linear scale for the y axis.
  const yLinearScale = d3.scaleLinear()
    .domain([1, d3.max(censusData, d => d.poverty)])
    .range([chartHeight, 0]);

  // Create scale functions for x axis
  const xLinearScale = d3.scaleLinear()
    .domain([6, d3.max(censusData, d => d.healthcare)])
    .range([0, chartWidth]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  const bottomAxis = d3.axisBottom(xLinearScale);
  const leftAxis = d3.axisLeft(yLinearScale);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    const circlesGroup = chartGroup.selectAll("circle")
    .data(hairData)
    .join("circle")
    .attr("cx", d => xLinearScale(d.hair_length))
    .attr("cy", d => yLinearScale(d.num_hits))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

    // Step 6: Initialize tool tip
    // ==============================
    const toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(d => `${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches)");
  }).catch(error => console.log(error));

}).catch(error => console.log(error));
