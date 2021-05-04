// @TODO: YOUR CODE HERE!

// starting with D3 02-Activities-03-Par_BarChart_From_CSV
// Define SVG area dimensions
const svgWidth = 1000;
const svgHeight = 650;

// Define the chart's margins as an object
const chartMargin = {
  top: 40,
  right: 40,
  bottom: 100,
  left: 40
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
    .domain([d3.min(censusData, d => d.poverty), d3.max(censusData, d => d.poverty)])
    .range([chartHeight, 0]);

  // Create scale functions for x axis
  const xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d.healthcare), d3.max(censusData, d => d.healthcare)])
    .range([0, chartWidth]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  const bottomAxis = d3.axisBottom(xLinearScale.nice());
  const leftAxis = d3.axisLeft(yLinearScale.nice());

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

    // Create Circles
    // ==============================
    const circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .join("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "12")
    .attr("class", "stateCircle");

    // Initialize tool tip
    // ==============================
    const toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, 0])
      .html(d => `<strong>${d.state}<br>Health Care: ${d.healthcare} % <br> Poverty: ${d.poverty} %`);

    // Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

    // Create axes labels
    // x axis labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 1.4))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

      // y axis labels
    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 25})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

      // bubble state abbr labels
      // used part of code and how to put abbr into bubbles https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168
      const abbrState = chartGroup.selectAll("stateText")
      .data(censusData)
      .enter()
      .append("text")
      .classed("stateText", true)
      .attr("x", d => xLinearScale(d.healthcare))
      .attr("y", d => yLinearScale(d.poverty))
      .text(d => d.abbr);


}).catch(error => console.log(error));
