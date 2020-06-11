var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page

var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

var dataset;
var columns;
var dataforEachColumn = new Object();
var row;
var data_array=[];
var bins_displayed = 0;
var xrange_yfrequency_2d_array = [];
var column_data;

var array = [];
var myMap = new Object();

d3.csv("sample_accidents.csv", function(data){
  dataset = data
  columns = d3.keys(dataset[0])
  

  var options = d3.select("#selectButton")
      .selectAll('option')
      .data(columns)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })
      getData(dataset)
      getFrequency(dataforEachColumn, column_data)
});
$('#selectButton').change(function(){
  
  $('svg>g').html('');
column_data=$(this).val();
array=[];
getFrequency(dataforEachColumn, column_data);
getChartForColumn(dataforEachColumn, column_data);
})

var numerical_cols = ["Temperature(F)","Humidity(%)"]
var categorical_col = ["TMC","Severity","Side","City","County","Wind_Direction","Weather_Condition","Crossing","Junction","Railway","Station","Traffic_Signal","Sunrise_Sunset"]

function getChartForColumn(dataforEachColumn, column_data) {
  if(numerical_cols.includes(column_data)){
    bins = 20
    draw_histogram(dataforEachColumn, column_data, bins);
  }
  else {
    draw_bar(column_data);
  }
}



function getData(arr) {
  arr.forEach(getColumnWiseData);
}

function getColumnWiseData(item) {
  row = item;
  columns.forEach(getDataForEachColumn);
}

function getDataForEachColumn(colData) {
  column_data = colData
  if(dataforEachColumn[colData] != null) {
    dataforEachColumn[colData] = dataforEachColumn[colData] + ':' + row[colData]
  }
  else {
    dataforEachColumn[colData] = row[colData]
  }
}


function getFrequency(dataforEachColumn, columnData) { 
  window.myMap={};
  temp = dataforEachColumn[columnData].split(':')
  temp.forEach(populateDataFreq);
  convertMapToArray(myMap);
}

function populateDataFreq(item) {
  if(myMap[item] != null) {
    myMap[item] = myMap[item] + 1
  }
  else {
    myMap[item] = 1 
  }
  
}

function convertMapToArray(myMap) {
  var x_columns = Object.keys(myMap);
  var y_columns = Object.values(myMap);
  for(var i=0; i<x_columns.length; i++){
    array.push([x_columns[i],y_columns[i]])

  }
}

function draw_bar(column_data)
{
    d3.select('svg').selectAll('*').remove();
    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


    var xScale = d3.scaleBand().range([0, width]).padding(0.4);
    var yScale = d3.scaleLinear().range([height, 0]);
    xScale.domain(array.map(function(d) { return d[0]; }));
    yScale.domain([0, d3.max(array, function(d) { return d[1]; })]);
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))
     .append("text")
     .attr("y", height - 250)
     .attr("x", width - 100)
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .text(dataforEachColumn[column_data]);

    g.append("g")
     .call(d3.axisLeft(yScale).tickFormat(function(d){
         return  d;
     })
     .ticks(10))
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "-5.1em")
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .attr("font-size","15px")

    var yAxis = g.append("g")
      .call(d3.axisLeft(yScale));

    yAxis.append('text')
      .attr("transform", "rotate(-90)")
      .attr('y', -40)
      .attr('x', -(height/2) + 50)
      .attr("fill","black")
      .attr("font-size","20px")
      .text('Number of items')

    var xAxis = g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    xAxis.append('text')
    .attr('y', 40)
    .attr('x', width/2)
    .attr("fill","black")
    .attr("font-size","20px")
    .text(column_data)

    g.selectAll(".bar")
     .data(array)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d[0]); })
     .attr("y", function(d) { return yScale(d[1]); })
     .attr("width", xScale.bandwidth())
     .attr("height", function(d) { return height - yScale(d[1]); })
     .attr("fill","#396AB1")
     .on("mouseover",function(d)
      { 
        d3.select(this)
          .attr("x", function(d,i) { return xScale(d[0]) - 5; })
          .attr("width",xScale.bandwidth() + 10)
          .attr("y", function(d,i) { return yScale(d[1]) - 10; })
          .attr("height", function(d) { return height - yScale(d[1]) + 10; })
          .attr("fill","#000000")

        g.append('text')
         .attr('id','text')
         .attr('class','over_label')
         .attr('x',function()
         {
            return (xScale(d[0]) + (xScale.bandwidth() - 35)/2)
         })
         .attr('y',function()
         {
            return yScale(d[1]) - 15
         })
         .text(function()
         {
            return d[2]
         })
         .attr("font-size","15px")
         .text(function() {return ['(' + d[0] + ', ' + d[1] + ')'];});
      })
      .on("mouseout",function(d)
      {
        d3.select(this)
          .attr("x", function(d,i) { return (xScale(d[0])); })
          .attr("width", xScale.bandwidth())
          .attr("y", function(d,i) { return (yScale(d[1])); })
          .attr("height", function(d) { return height - yScale(d[1]); })
          .attr("fill","#b30505")

        g.selectAll('.over_label').remove()
    
      });
    }

function draw_histogram(dataforEachColumn, column_data, bins) {

  d3.select('svg').selectAll('*').remove();
  var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin, //1400
        height = svg.attr("height") - margin //500
  // console.log(dataforEachColumn[column_data].split(':'))

  var data = dataforEachColumn[column_data].split(':')

  var x = d3.scaleLinear()
      .domain([0, d3.max(data)])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);


  var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


  var xAxis = g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // setting the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d; })   
      .domain(x.domain())  
      .thresholds(x.ticks(bins)); 

 
  var histplot = histogram(data);

  var yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(histplot, function(d) { return d.length; })]);  
  var yAxis = g.append("g")
      .call(d3.axisLeft(yScale));

  yAxis.append('text')
    .attr("transform", "rotate(-90)")
    .attr('y', -40)
    .attr('x', -(height/2) + 50)
    .attr("fill","black")
    .attr("font-size","20px")
    .text('Number of items')

  xAxis.append('text')
    .attr('y', 40)
    .attr('x', width/2)
    .attr("fill","black")
    .attr("font-size","20px")
    .text(column_data)

  // appending the bar rectangles to the svg element
  var dots = svg.selectAll("rect")
      .data(histplot)
      .enter()
      .append("rect")
        // .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + parseInt(yScale(d.length)+100) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - yScale(d.length); })
        .style("fill", "#6B4C9A");

  dots.transition().duration(1000).delay(function(d,i){ return i * (1000 / 4); })
  .style('opacity', 1);

  dots.on("mouseover",function(d)
      { 
        d3.select(this)
          // .attr("x", function(d,i) { return x(d.x1) - (x(d.x1)-x(d.x0))/2 - 15; })
          // .attr("width", function(d,i) { return x(d.x1) - x(d.x0) - 1})
          // .attr("y", function(d,i) { return yScale(d.length) - 10; })
          .attr("height", function(d) { return height - yScale(d.length + 10); })
          // .text('(' + (d.x0 + ((d.x1 - d.x0)/2))+ ', ' + d.length + ')')
          .attr("fill","red")

        g.append('text')
         .attr('id','text')
         .attr('class','over_label')
         .attr('x',function()
         {
            return x(d.x1) - (x(d.x1)-x(d.x0))/2 + 10;
         })
         .attr('y',function()
         {
            return yScale(d.length) - 10
         })
         .attr("font-size","15px")
         .attr("fill","#000000")
         .text(function() {return ['(' + (d.x0 + ((d.x1 - d.x0)/2))+ ', ' + d.length + ')'];});
      })
      .on("mouseout",function(d)
      {
        d3.select(this)
          // .attr("x", function(d,i) { return (x(d.x0)); })
          // .attr("y", function(d,i) { return (yScale(d.length)); })
          .attr("fill","#b30505")
          .attr("height", function(d) { return height - yScale(d.length); })
          

        g.selectAll('.over_label').remove()
        // g.select
      });

      d3.select('svg').on('mousedown', function() {
        var initialvalue = d3.mouse(this);

        d3.select('svg')
          .on('mouseup', function() {
            d3.select('svg')
            .on('mousemove', null);
        });

        d3.select('svg').on('mousemove', function() {
          var finalvalue = d3.mouse(this);
          var diff = finalvalue[0] - initialvalue[0];
          if(diff > 0) {
            bins -= 1;
          }
          else {
            bins += 1;
          }
          console.log(bins)
          draw_histogram(dataforEachColumn, column_data, bins); 
        });
      })

  }

        






