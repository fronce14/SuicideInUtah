// Get target element's width and use aspect ratio to set height
var div_id  = "choropleth",
		width   = document.getElementById(div_id).clientWidth,
		height  = width*0.67,
		center  = [-113.3010264, 39.7287941],
		// Set margins around rendered map
		margins = {"top": 0, "bottom": 0, "left": 0, "right": 0};

var projection = d3.geoMercator().scale(4500).center(center).translate([width/3, height/2.2]);
// Geo-paths take a GeoJSON geometry/feature object and generate an SVG path data string or render the path to a Canvas
var path = d3.geoPath().projection(projection);

function ready(error, utah, districts, suicide_rates){
	if(error) console.error(error);

	var max = d3.max(suicide_rates, function(d){ return +d.rate_per_100k; });

	var x = d3.scaleLinear()
						.domain([0, max])
						.rangeRound([600, 860]);

	var color = d3.scaleQuantize()
								.domain([0, max])
								.range(d3.schemeReds[9]);

	function color_fill(data){
		var element = suicide_rates.find(function(element){ return element.county == data.properties.name; });
		data.rate = element.rate_per_100k;
		return color(data.rate);
	}

	// Select target element and attach <svg> and <g> elements
	var div = d3.select("#" + div_id);
		
	div.insert("h2", ":first-child").text("Suicide Rate by Local Health District*")
		.style("text-align", "center");
	
	var svg = d3.select("#" + div_id).append("svg")
			// Set SVG element's top left corner and width/height attributes
			.attr("viewBox",margins.top + " " + margins.left + " " + (width - margins.right) + " " + (height - margins.bottom))
			// Supposed to make map responsive. Works sometimes.
			.attr("preserveAspectRatio", "xMidYMid meet")
			// Group together map paths and location markers	
		.append('g')
			.attr('class', div_id + "_group");

	var key = svg.append("g")
							.attr("class", "key")
							.attr("transform", "translate(-125,25)");

	key.selectAll("rect")
		.data(color.range().map(function(d) {
			d = color.invertExtent(d);
			if (d[0] == null) d[0] = x.domain()[0];
			if (d[1] == null) d[1] = x.domain()[1];
			return d;
			}))
		.enter()
		.append("rect")
			.attr("height", 10)
			.attr("x", function(d) { return x(d[0]); })
			.attr("width", function(d) { return x(d[1]) - x(d[0]); })
			.attr("fill", function(d) { return color(d[0]); });


	key.append("text")
			.attr("class", "caption")
			.attr("x", x.range()[0])
			.attr("y", -6)
			.attr("fill", "#000")
			.attr("text-anchor", "start")
			.attr("font-weight", "bold")
			.text("Rate per 100,000 population, age 10+");

	key.call(d3.axisBottom(x)
						.tickSize(13)
						.tickFormat(function(x, i) { return Math.floor(x) + "%"; })
						.tickValues([0, (max*0.25), (max*0.5), (max*0.75), max]))
	 .select(".domain")
		.remove();

	key.selectAll(".tick line").attr("stroke", "none");

	// Group together country shape paths and enter data
	var map = svg.append("g")
		 .attr("class", div_id + "_counties")
		 .selectAll("path")
		 .data(utah.features)
		 .enter()
		 // Render and style map
		 .append("path")
			 .attr("d", path)
			 .attr("stroke", "#fff")
			 .attr("fill", function(d) { return color_fill(d); })
			 .attr("stroke-width", "0.5px")
		 .append("title")
			 .text(function(d) { return d.rate + "%"; });

	svg.append("g")
		 	.attr("class", div_id + "_border")
		 .selectAll("path")
		 .data(districts.features)
  		.enter()
  		.append("path")
			 .attr("d", path)
			 .attr("stroke", "#fff")
			 .attr("fill", "none")
			 .attr("stroke-width", "1px")
   		 .attr("stroke", "black")

	div.insert("p")
		 .html("*For more information on local health districts, visit Utah's <a href=\"https://ibis.health.utah.gov/about/LocalHealth.html\">Public Health Indicator Based Information System</a>")
		 .style("color", "#555")
		 .style("text-align", "center")
		 .style("font-size", "12px");

} // Close function ready(error, utah, suicide_rates){...

d3.queue()
	.defer(d3.json, "https://rawgit.com/becausealice2/FA-viz/master/suicide_rates/utah-counties.json")
	.defer(d3.json, "https://rawgit.com/becausealice2/FA-viz/master/suicide_rates/utah-districts.geojson")
	.defer(d3.csv, "https://rawgit.com/becausealice2/FA-viz/master/suicide_rates/suicide-by-health-district.csv")
	.await(ready);