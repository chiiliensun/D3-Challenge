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
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
const chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("hours-of-tv-watched.csv").then(function(tvData) {

  // Log the tvData
  console.log(tvData);

  // Cast the hours value to a number for each piece of tvData
  tvData.forEach(function(data) {
    data.hours = +data.hours;
  });

  const barSpacing = 10; // desired space between each bar
  const scaleY = 8; // 8x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  const barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / tvData.length;

  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll("rect")
    .data(tvData)
    .join("rect")
    .attr('height',d=>d.hours*scaleY)
    .attr('width', barWidth)
    .attr('x',(d,i)=>(barWidth+barSpacing)*i)
    .attr('y',d => chartHeight - d.hours*scaleY)
    .attr('class','bar')
    // chartHeight = y-start-coordinate + height of bar
    // chartHeight - height of bar = y-start-coordinate

}).catch(error => console.log(error));
