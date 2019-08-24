function onDocumentReady() {

// Build power Gauge in d3
var gauge = function(container, configuration) {
	var that = {};
	var config = {
		size						: 200,
		clipWidth					: 200,
		clipHeight					: 110,
		ringInset					: 20,
		ringWidth					: 20,
		
		pointerWidth				: 10,
		pointerTailLength			: 5,
		pointerHeadLengthPercent	: 0.9,
		
		minValue					: 1,
		maxValue					: 5,
		
		minAngle					: -90,
		maxAngle					: 90,
		
		transitionMs				: 750,
		
		majorTicks					: 4,
		labelFormat					: d3.format(',g'),
		labelInset					: 10,
		
		arcColorFn					: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
	};
	var range = undefined;
	var r = undefined;
	var pointerHeadLength = undefined;
	var value = 0;
	
	var svg = undefined;
	var arc = undefined;
	var scale = undefined;
	var ticks = undefined;
	var tickData = undefined;
	var pointer = undefined;

    var donut = d3.layout.pie();
    
	
	function deg2rad(deg) {
		return deg * Math.PI / 180;
	}
	
	function newAngle(d) {
		var ratio = scale(d);
		var newAngle = config.minAngle + (ratio * range);
		return newAngle;
	}
	
	function configure(configuration) {
		var prop = undefined;
		for ( prop in configuration ) {
			config[prop] = configuration[prop];
		}
		
		range = config.maxAngle - config.minAngle;
		r = config.size / 2;
		pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

		// a linear scale that maps domain values to a percent from 0..1
		scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
		ticks = scale.ticks(config.majorTicks);
		tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
		
		arc = d3.svg.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
	}
	that.configure = configure;
	
	function centerTranslation() {
		return 'translate('+r +','+ r +')';
	}
	
	function isRendered() {
		return (svg !== undefined);
	}
	that.isRendered = isRendered;
	
	function render(newValue) {
		svg = d3.select(container)
			.append('svg:svg')
				.attr('class', 'gauge')
				.attr('width', config.clipWidth)
				.attr('height', config.clipHeight);
		
		var centerTx = centerTranslation();
		
		var arcs = svg.append('g')
				.attr('class', 'arc')
				.attr('transform', centerTx);
		
		arcs.selectAll('path')
				.data(tickData)
			.enter().append('path')
				.attr('fill', function(d, i) {
					return config.arcColorFn(d * i);
				})
				.attr('d', arc);

	// Label the gauge axis
		var name = "Value";

		var value = 17;
		var dataset = [{
			metric: name,
			value: value
		}]

		var texts = svg.selectAll("text")
			.data(dataset)
			.enter();
	
		texts.append("text")
			.text(function () {
				return "Strong Negative Bias";
			})
			.attr('id', 'scale20')
			.attr('transform', "translate(5, 280)")


		texts.append("text")
			.text(function () {
				return "Strong Positive Bias";
			})
			.attr('id', 'scale20')
			.attr('transform', "translate(355, 280)")
	
		
		var lg = svg.append('g')
				.attr('class', 'label')
				.attr('transform', centerTx);
		lg.selectAll('text')
				.data(ticks)
			.enter().append('text')
				.attr('transform', function(d) {
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * range);
					return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
				})
				.text(config.labelFormat);

		var lineData = [ [config.pointerWidth / 2, 0], 
						[0, -pointerHeadLength],
						[-(config.pointerWidth / 2), 0],
						[0, config.pointerTailLength],
						[config.pointerWidth / 2, 0] ];
		var pointerLine = d3.svg.line().interpolate('monotone');
		var pg = svg.append('g').data([lineData])
				.attr('class', 'pointer')
				.attr('transform', centerTx);
				
		pointer = pg.append('path')
			.attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
			.attr('transform', 'rotate(' +config.minAngle +')');
			
		update(newValue === undefined ? 0 : newValue);
	}
	that.render = render;
	
	function update(newValue, newConfiguration) {
		if ( newConfiguration  !== undefined) {
			configure(newConfiguration);
		}
		var ratio = scale(newValue);
		var newAngle = config.minAngle + (ratio * range);
		pointer.transition()
			.duration(config.transitionMs)
			.ease('elastic')
			.attr('transform', 'rotate(' +newAngle +')');
	}
	that.update = update;

	configure(configuration);
	
	return that;
};

// Wire power gauge up to take in data
    
    var powerGauge = gauge('#power-gauge', {
		size: 500,
		clipWidth: 550,
		clipHeight: 300,
		ringWidth: 100,
		maxValue: 5,
		transitionMs: 4000,
	});
	powerGauge.render();
    
    // function alertFunc(param1, param2) {
        var param1 = 1;
		var param2 = 2;
		var param3 = 3;
		var param4 = 4;
		var param5 = 5;
    // }

	function updateReadings() {
		// default data value
        powerGauge.update(param2);
	}
	
	// every few seconds update reading values
	updateReadings();
	setInterval(function() {
        updateReadings();
    }, 100000);
    

    // Wire up gauge to respond to city data entered
		var tableData = scores_data;
		function cityAverage(filteredData){
			let scoreTotal = 0
			filteredData.map(obj=>scoreTotal += obj.tweet_grade)
			return scoreTotal/filteredData.length;
		}
						
        var submit = d3.select("#filter-btn");
        submit.on("click", function() {
            // Prevent the page from refreshing
            d3.event.preventDefault();
        
            // Get the value property of the input element
            
            var inputValueCity = d3.select("#city").property("value");
        
        
            // Filtered data array
            var filteredData = tableData.filter(tableDatum => 
                tableDatum.Location === inputValueCity);
				console.log(cityAverage(filteredData));
        
            // Clear table and message if it exists
            
				console.log(filteredData);
			

            if(filteredData === undefined || filteredData.length == 0) {
                d3.select("span").text("No tweets for the location(s) you entered! Try again!").style("font-size", "16px");
            }
            else {
                // Display new table with filtered data
				let CA = cityAverage(filteredData);
				powerGauge.update(CA);
			}
			
			// Clear filters
			d3.select("#city").node().value = "";
			
		});

			// Select the Reset button
			var submit = d3.select("#un-filter-btn");
			submit.on("click", function () {
				// Prevent the page from refreshing
				d3.event.preventDefault();

				// Clear table and message if it exists
				d3.select("span").html("");

			})
		
}
		if ( !window.isLoaded ) {
	window.addEventListener("load", function() {
		onDocumentReady();
	}, false);
} else {
	onDocumentReady();
}
