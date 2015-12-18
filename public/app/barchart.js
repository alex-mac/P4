angular.module('graphView', [])
  .directive('d3Bars', ['d3Service', '$window', function(d3Service, $window) {
    return {
      restrict: 'EA',
      scope: {
        graph: '@',
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        if (scope.data && scope.data.length > 0) {


          var params = {
            "sun": [scope.data, "Sunlight", "#ff9100", "sun"],
            "water": [scope.data, "Soil Moisture", "#00b0ff", "water"],
            "soil": [scope.data, "Soil Nutrition", "#76ff03", "soil"],
            "temp": [scope.data, "Temperature", "#ff1744", "temp"]
          }

          var t;
          scope.graph;
          t = scope.graph;
          scope.data = params[t][0];
  
          var height = 350,
          margin = {top: 35, bottom: 100, left: 35, right: 35},
          innerHeight = height - margin.top - margin.bottom,
          initWidth = d3.select('.container').node().offsetWidth - margin.left - margin.right;

          var svg= d3.select(element[0])
            .append("svg")
//          .attr('class', 'chart')
            .style('width', initWidth)
            .style('height', height)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };


          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.render = function(data) {
        
          // remove all previous items before render
          svg.selectAll('*').remove();
          
          // If we don't pass any data, return out of the element
          if (!data) return;
         
          // Use the category20() scale function for multicolor support
          color = d3.scale.category20();

          var width = d3.select('.container').node().offsetWidth - margin.left - margin.right;
          var barWidth = width/data.length;
          
          svg.attr('width', width);


// GRID LINES HORIZONTAL
          svg.selectAll("line.horizontalGrid").data([1,2,3,4,5]).enter()
            .append("line")
            .attr({
              "class":"horizontalGrid",
              "x1" : 10,
              "x2" : width,
              "y1" : function(d){ return d*30;},
              "y2" : function(d){ return d*30;},
              "fill" : "none",
              "shape-rendering" : "crispEdges",
              "stroke" : "rgb(224, 224, 224)",
              "stroke-width" : "1px"
            });

// LINE GRAPH
          var dateRange = [new Date(data[0].date), new Date(data[data.length - 1].date)];
          var x = d3.time.scale()
            .domain(d3.extent(data, function(d) { return new Date(d.date); }))
            .rangeRound([0, width]);

          var y = d3.scale.linear()
            .domain(d3.extent(data, function(d) { return d.value; }))
            .range([innerHeight, 0]);

          var line = d3.svg.line()
            .x(function (d, i) { return x(new Date(d.date)); })
            .y(function (d) { return y(d.value); })
            .interpolate('cardinal');

          var area = d3.svg.area()
            .x(function (d, i) { return x(new Date(d.date)); })
            .y(function (d) { return y(d.value); })
            .y0(innerHeight)
            .interpolate('cardinal');


          svg.append("path")
            .datum(data)
            .attr({
              "class" : params[t][3],
              "d" : area 
            });

          svg.append("path")
            .attr("d", line(data))
            .attr("stroke", params[t][2])
            .attr("stroke-width", 2)
            .attr("fill", "none");


// BARS          
          // svg.selectAll('rect')
          // .data(data).enter()
          // .append('rect')
          // .attr('class', 'rectangle')
          // .attr('width', barWidth)
          // .attr('height', 0)
          // .attr('y', height - margin.top - margin.bottom )
          // .attr('x', function(d,i) {
          //   return i * barWidth;
          // })
          // .attr('fill', function(d) { return color(d.value); })
          // .transition()
          // .duration(1000)
          // .attr('y', function(d) {
          //   return height - margin.top - margin.bottom - d.value;
          // })
          // .attr('height', function(d) { return d.value; })
          // .text(function (d) {
          //   return d.date + "(" + d.value + ")";
          // })

// AXES
          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(d3.time.hours, 4)
            .tickFormat(d3.time.format.multi([
              ['%m/%d %I %p', function(d) { return (d.getHours() == 0); }],
              ['%I:%M %p', function(d) { return true; }]
              ]));


          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + innerHeight + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", -5)
            .attr("x", -65)
            //.attr("dy", ".35em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "start");

          svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0, " + 0 + ")")
            .call(yAxis)
            .selectAll("text")
            .attr("y", 0)
           // .attr("x", -25)
            //.attr("dy", ".35em")
            .style("text-anchor", "end");

        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .attr('class', 'graph-title')  
            .text(params[t][1] + ": " + dateRange[0].toDateString() + " - " + dateRange[1].toDateString());
        }
        } else {
          d3.select(element[0])
            .append("div")
            .attr('class', 'no-data font-1')
            .text("No data available");
        }
      })
    }
  }
}]);
