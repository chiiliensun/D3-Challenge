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
    .domain([0, d3.max(censusData, d => d.poverty)])
    .range([chartHeight, 0]);

  // Create scale functions for x axis
  const xLinearScale = d3.scaleLinear()
    .domain([6, d3.max(censusData, d => d.healthcare)])
    .range([0, chartWidth]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  const bottomAxis = d3.axisBottom(xLinearScale);
  const leftAxis = d3.axisLeft(yLinearScale);

  // Create code to build the scatter plot.
  chartGroup.append("g")
    

}).catch(error => console.log(error));
