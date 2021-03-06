
# D3 Homework - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! I've just accepted a data visualization position for a major metro paper. I've tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand my findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on me to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/), but I was free to investigate a different data set. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

## My Task

### Core Assignment: D3 Dabbler (Required Assignment)

![4-scatter](D3_data_journalism/assets/imgs/scatter_screenshot.png)

I created a scatter plot between two of the data variables such as `Healthcare vs. Poverty`.

Using the D3 techniques I was taught in class, I create a scatter plot that represents each state with circle elements. I wrote code shown by this graphic in the `app.js` file of this repo— and made sure to pull in the data from `data.csv` by using the `d3.csv` function.

* I included state abbreviations in the circles.

* I created and situated the axes and labels to the left and bottom of the chart.
