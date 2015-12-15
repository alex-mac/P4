angular.module('graphView', [])
.directive('angulard3LineChart', function () { // Angular Directive
      return {
         restrict: 'A',
      scope: {
         datajson: '=',
         xaxisName: '=',
         xaxisPos: '=',
         yaxisName: '=',
         yaxisPos: '=',
         d3Format: '='
         // All the Angular Directive Vaiables used as d3.js parameters
                          },
      link: function (scope, elem, attrs) {
      var ourGraph = new LineChart(scope.datajson,scope.yaxisName,scope.yaxisPos,scope.d3Format);
      //d3 related Variable initialisation
      ourGraph.workOnElement('#'+elem[0].id); // Work on particular element
      ourGraph.generateGraph(); // generate the actual bar graph
    } 
  }
})


//   .directive('d3Bars', ['d3Service', '$window', function(d3Service, $window) {
//     return {
//       restrict: 'EA',
//       scope: {
//         graph: '@'
//       },
//       link: function(scope, element, attrs) {
//         d3Service.d3().then(function(d3) {

//   //       scope.graph;
//   //       switch (scope.graph) {
//   //         case 'sun':
//   //           scope.data = sunData;
//   //           break;
//   //         case 'water':
//   //           scope.data = waterData;
//   //           break;
//   //         case 'soil':
//   //           scope.data = soilData;
//   //           break;
//   //         default:
//   //           scope.data = [];
//   //       }
        
        // var parseDate = d3.time.format("%d-%b-%y").parse;

        // scope.data.forEach(function (d) {
        //   d.date = parseDate(d.date);
        //   d.close = +d.close;
        // });

        var margin = {top: 30, bottom: 100, left: 0, right: 0},
        height = 250,
        initWidth = d3.select('.container').node().offsetWidth - margin.left - margin.right;

        var svg= d3.select(element[0])
          .append("svg")
          .attr('class', 'chart')
          .style('width', initWidth)
          .style('height', height)
        .append('g')
          .attr('transform', 'translate(0, ' + margin.top + ')');
>>>>>>> master


//   //       // Browser onresize event
//   //       window.onresize = function() {
//   //         scope.$apply();
//   //       };


//   //       // Watch for resize event
//   //       scope.$watch(function() {
//   //         return angular.element(window)[0].innerWidth;
//   //       }, function() {
//   //         scope.render(scope.data);
//   //       });

//   //       scope.render = function(data) {
        
//   //         // remove all previous items before render
//   //         svg.selectAll('*').remove();
           
//   //         // If we don't pass any data, return out of the element
//   //         if (!data) return;
          
//   //         // Use the category20() scale function for multicolor support
//   //         color = d3.scale.category20();

          var width = d3.select('.container').node().offsetWidth - margin.left - margin.right;
          var barWidth = width/data.length;
           
          svg.attr('width', width);

// LINE GRAPH
          var xScale = d3.time.scale()
//            .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
            .rangeRound([0, width]);

          var yScale = d3.scale.linear()
              .range([height - margin.top, margin.bottom])
//              .domain([0, 100]);

          var line = d3.svg.line()
              .x(function(d, i) { return i*barWidth; })
              .y(function(d) { return height - margin.top - margin.bottom - d.value; })
              .interpolate('basis');

          xScale.domain(d3.extent(data, function(d) { return d.date; }));
          yScale.domain(d3.extent(data, function(d) { return d.value; }));

          svg.append("path")
              .attr("d", line(data))
              .attr("stroke", "blue")
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

          // our xScale
          // var yScale = d3.scale.linear()
          // .range([d3.max(data, function(d) {
          //   return d.value;
          // }), 0])
          // .domain([0, height - 2*margin]),
          
          var x = d3.time.scale()
            .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
            .rangeRound([0, width]);

          // var xScale = d3.scale.ordinal()
          //   .rangeRoundBands([0, width - margin.left - margin.right], 0)
          
          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .ticks(d3.time.hours, 6)
              .tickFormat(d3.time.format('%c'));

          // var yAxis = d3.svg.axis()
          //     .scale(yScale)
          //     .orient("left")
          //     .ticks(10, "%");

  //        xScale.domain(data.map(function(d) { return d.date; }));

  //        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .selectAll("text")
              // .attr('width', barWidth)
              .attr("y", 0)
              .attr("x", 70)
              .attr("dy", ".35em")
              .attr("transform", "rotate(-90)")
              //.style("text-anchor", "start")




          
        }
      })
    }
  }
}]);
