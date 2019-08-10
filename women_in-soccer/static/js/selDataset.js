  var outerWidth = 960;
      var outerHeight = 1100;
      var margin = { left: 130, top: 10, right: 30, bottom: 47 };
      var barPadding = 0.2;

      var xColumn = "crime_count";
      var yColumn = "psa";
      var colorColumn = "offense";
      var layerColumn = colorColumn;
      
      var hoveredColorValue;
      var hoveredStrokeColor = "black";

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;
      // var innerHeight = 1000;

      var svg = d3.select("#chart").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      
      // This is the layer where the bars are drawn.
      var baseBarLayer = g.append("g");
      
      // This layer contains a semi-transparent overlay
      // that fades out the base bars.
      var overlayRect = g.append("g")
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "none")
        .style("pointer-events", "none");
      
      // This contains the subset of bars rendered on top
      // when you hover over the entries in the color legend.
      var foregroundBarLayer = g.append("g");
      
      var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")");
      var yAxisG = g.append("g")
        .attr("class", "y axis");
      var colorLegendG = g.append("g")
        .attr("class", "color-legend")
        .attr("transform", "translate(650, 0)");

      var xScale = d3.scale.linear().range([0, innerWidth]);
      var yScale = d3.scale.ordinal().rangeBands([innerHeight, 0], barPadding);
      var colorScale = d3.scale.category10();
      // var colorScale = d3.scale.ordinal();
      // colorScale.range(["red","purple"]);
      // var colorScale = d3.scale.linear()
      //     .domain([0, 1000])
      //     .range(["rgb(245, 66, 114)", "rgb(245, 66, 114)"]);

      var tipNumberFormat = d3.format(",");
      var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return [
            d[colorColumn],
            " in ",
            d[yColumn],
            ": ",
            tipNumberFormat(d[xColumn])
          ].join("");
        });
      g.call(tip);
      
      // Use a modified SI formatter.
      var siFormat = d3.format("s");
      var customTickFormat = function (d){
        return siFormat(d);
      };

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
        .ticks(10)
        .tickFormat(customTickFormat)
        .outerTickSize(0);

      


      const xAxisLabelText = 'Total Crime by PSA'

      var yAxis = d3.svg.axis().scale(yScale).orient("left")
        .outerTickSize(0);
      
      const yLabel = 'District PSA'

      var colorLegend = d3.legend.color()
        .scale(colorScale)
        .shapePadding(6.24)
        .shapeWidth(25)
        .shapeHeight(25)
        .labelOffset(5);

    // function getData (csv_file){
      // d3.csv(csv_file, function(err, crime2016Data) {
        // if (err) throw err;
        // console.log(crime2016Data);
    
        // crime2016Data.forEach(function(data) {
            // data.psa = data.psa;
            // data.offense = data.offense;
            // data.crime_count = +data.crime_count;
        // });

        

      

      function render(data){

        var nested = d3.nest()
          .key(function (d){ return d[layerColumn]; })
          .entries(data);

        var stack = d3.layout.stack()
          .y(function (d){ return d[xColumn]; })
          .values(function (d){ return d.values; });

        var layers = stack(nested.reverse()).reverse();

        xScale.domain([
          0,
          d3.max(layers, function (layer){
            return d3.max(layer.values, function (d){
              return d.y0 + d.y
              // console.log(d.y0);
            });
          })
        ]);

        yScale.domain(layers[0].values.map(function (d){
          return d[yColumn];
          console.log(yColumn);
        }));

        colorScale.domain(layers.map(function (layer){
          return layer.key;
        }));

        xAxisG.call(xAxis); 

        xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', 65)
          .attr('x', innerWidth / 3)
          .attr('fill', 'black')
          .text(xAxisLabelText);

        yAxisG.call(yAxis);

        yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', -innerHeight / 2)
          .attr('y', -60)
          .attr('transform', `rotate(-90)`)
          .style('text-anchor', 'middle')
          .text(yLabel);

        renderBars(baseBarLayer, layers);
        
        if(hoveredColorValue){
          setOverlayTransparency(0.7);
          renderBars(foregroundBarLayer, layers.filter(function (layer){
            return layer.key === hoveredColorValue;
          }));
        } else {
          setOverlayTransparency(0.0);
          renderBars(foregroundBarLayer, []);
        }
        
        colorLegendG.call(colorLegend);
        
        // Move the text down a bit.
        colorLegendG.selectAll("text").attr("y", 4);
        
        listenForHover(colorLegendG.selectAll("rect"), data);
        listenForHover(colorLegendG.selectAll("text"), data);
      }
      
      function renderBars(g, layers){
        var layerGs = g.selectAll(".layer").data(layers);
        layerGs.enter().append("g").attr("class", "layer");
        layerGs.exit().remove();

        layerGs.style("fill", function (d){
          return colorScale(d.key);
        });

        var bars = layerGs.selectAll("rect").data(function (d){
          return d.values;
        });
        bars.enter().append("rect")
          .on("mouseover", function(d){
            tip.show(d);
          
            // Fix the issue where the tip goes off the screen.
            d3.select(".d3-tip").style("left", "100px");
          })
          .on("mouseout", tip.hide);
        bars.exit().remove();
        bars
          .attr("x", function (d){ return xScale(d.y0); })
          .attr("y", function (d){ return yScale(d[yColumn]); })
          .attr("width", function (d){ return xScale(d.y); })
          .attr("height", yScale.rangeBand());
      }
      
      function listenForHover(selection, data){
        selection
          .on("mouseover", function (d){
            hoveredColorValue = d;
            render(data);
          })
          .on("mouseout", function (d){
            hoveredColorValue = null;
            render(data);
          })
          .style("cursor", "pointer");
      }
      
      function setOverlayTransparency(alpha){
        overlayRect
          .transition().duration(400)
          .attr("fill", "rgba(255, 255, 255, " + alpha + ")");
      }

      function type(d){
        d.crime_count = +d.crime_count;
        
        // Shorten this, as the long label is problematic
        if(d.offense === 'ASSAULT W/DANGEROUS WEAPON'){
          d.offense = 'ASSAULT W/DW';
        }
        
        return d;
      }
      // const dataUrl = 'https://raw.githubusercontent.com/curran/data/gh-pages/pew/religion/processed/religionByCountryTop20.csv';
  
      d3.js("crime2016.js", type, render);
      
      
      
      // function getData(csv_file) {
      //    d3.csv("crime2016.csv", type, render);
      //      if (err) throw err;
      //      console.log(csv_file);
    
  // }

// getData("crime2016.csv")
