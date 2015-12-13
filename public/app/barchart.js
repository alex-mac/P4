angular.module('graphView', [])
  .directive('d3Bars', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        var margin = parseInt(attrs.margin) || 20,
        barWidth = parseInt(attrs.barWidth) || 20,
        barPadding = parseInt(attrs.barPadding) || 5;

        var svg= d3.select(element[0])
        .append("svg")
        .style('width', '100%');

        // hard-code data
        scope.data = [
          {name: "Greg", score: 100},
          {name: "Ari", score: 90},
          {name: 'Q', score: 80},
          {name: "Loser", score: 70},
          {name: "Greg", score: 60},
          {name: "Ari", score: 50},
          {name: 'Q', score: 40},
          {name: "Loser", score: 30},
          {name: "Greg", score: 95},
          {name: "Ari", score: 85},
          {name: 'Q', score: 75},
          {name: "Loser", score: 65},
          {name: "Greg", score: 55},
          {name: "Ari", score: 45},
          {name: 'Q', score: 35},
          {name: "Loser", score: 25}
        ];

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
         
        // setup variables
        var height = d3.select(element[0]).node().offsetHeight - margin,
        // calculate the height
        width = scope.data.length * (barWidth + barPadding),
        // Use the category20() scale function for multicolor support
        color = d3.scale.category20(),
        // our xScale
        yScale = d3.scale.linear()
        .range([d3.max(data, function(d) {
          return d.score;
        }), 0])
        .domain([0, height]);
         
        // set the height based on the calculations above
        svg.attr('width', width);
         
        //create the rectangles for the bar chart
        svg.selectAll('rect')
        .data(data).enter()
        .append('rect')
        .attr('width', barWidth)
        .attr('height', 0)
        .attr('y', height )
        .attr('x', function(d,i) {
          return i * (barWidth + barPadding);
        })
        .attr('fill', function(d) { return color(d.score); })
        .transition()
        .duration(1000)
        .attr('y', function(d) {
          return height - d.score;
        })
        .attr('height', function(d) { return d.score; })
        // svg.selectAll('text')
        // .data(data).enter()
        // .append('text')
        // .attr('width', barWidth)
        // .attr('height', 140)
        // .attr('y', Math.round(margin/2))
        // .attr('x', function(d,i) {
        //   return i * (barWidth + barPadding) + 13;
        // })
        .text(function (d) {
          return d.name + "(" + d.score + ")";
        })
        }
      })
    }
  }
}]); 