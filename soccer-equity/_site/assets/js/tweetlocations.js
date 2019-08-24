// Creating map object
var map = L.map("map", {
  center: [39.1130, -105.3588],
  zoom: 3
});


var psaCams = {
    108: 7, 104: 7, 407: 7, 404: 7, 403: 7,
    405: 7, 409: 7, 402: 7, 502: 7, 501: 7,
    503: 7, 507: 7, 504: 7, 107: 5, 202: 5,
    205: 5, 206: 5, 302: 5, 401: 5, 406: 5,
    408: 5, 506: 5, 604: 5, 605: 5, 701: 5,
    106: 4, 105: 4, 201: 4, 208: 4, 203: 4,
    305: 4, 304: 4, 308: 4, 301: 4, 303: 4,
    116: 4, 603: 4, 602: 4, 608: 4, 607: 4,
    704: 4, 101: 2, 102: 2, 103: 2, 204: 2,
    207: 2, 209: 2, 307: 2, 306: 2, 601: 2,
    707: 2, 705: 2, 708: 2, 702: 2, 706: 2
};

var camCount = function getCamCount(psa) {
    return psaCams[psa];
};

 
function choosePattern(district, psa) {
   
    var returnPattern = new L.StripePattern({
        angle: 45,
        weight: camCount(psa),
        spaceWeight:2,
        color: chooseColor(district),
        opacity: 0.4,
    });
    console.log("moo");
    return returnPattern;
    
}



// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://opendata.arcgis.com/datasets/db24f3b7de994501aea97ce05a50547e_10.geojson";

// Function that will determine the color of a neighborhood based on the district it belongs to
function chooseColor(district) {
  switch (district) {
  case 1:
    return "goldenrod";
  case 2:
    return "red";
  case 3:
    return "orange";
  case 4:
    return "green";
  case 5:
    return "purple";
  case 6:
    return "blue";
  case 7:
    return "black";
  }
}


// Function that will determine the opacity of a neighborhood based on the value of the PSA it belongs to
function chooseOpacity(NAME) {
   switch (NAME) {
  case "207":
    return "1.0";
  case "208":
    return "1.0";
  case "305":
    return "1.0";
  case "302":
    return "1.0";
  case "206":
    return "1.0";
  case "106":
    return "1.0";
  case "307":
    return "1.0";
  case "101":
    return "1.0";
  case "602":
    return "1.0";
  case "603":
    return "1.0";
  case "503":
    return "1.0";
  case "104":
    return "1.0";
  case "506":
    return "1.0";
  case "209":
    return "1.0";
  case "501":
    return "1.0";
  case "308":
    return "0.75";
  case "507":
    return "0.75";
  case "304":
    return "0.75";
  case "604":
    return "0.75";
  case "107":
    return "0.75";
  case "303":
    return "0.75";
  case "505":
    return "0.75";
  case "502":
    return "0.75";
  case "404":
    return "0.75";
  case "102":
    return "0.75";
  case "301":
    return "0.75";
  case "608":
    return "0.75";
  case "402":
    return "0.75";
  case "607":
    return "0.75";
  case "202":
    return "0.75";
  case "306":
    return "0.50";
  case "401":
    return "0.50";
  case "406":
    return "0.50";
  case "704":
    return "0.50";
  case "204":
    return "0.50";
  case "409":
    return "0.50";
  case "504":
    return "0.50";
  case "108":
    return "0.50";
  case "403":
    return "0.50";
  case "405":
    return "0.90";
  case "703":
    return "0.50";
  case "708":
    return "0.50";
  case "407":
    return "0.50";
  case "605":
    return "0.50";
  case "105":
    return "0.50";
  case "606":
    return "0.35";
  case "707":
    return "0.35";
  case "701":
    return "0.35";
  case "706":
    return "0.35";
  case "203":
    return "0.35";
  case "408":
    return "0.35";
  case "702":
    return "0.35";
  case "103":
    return "0.35";
  case "705":
    return "0.35";
  case "201":
    return "0.35";
  case "205":
    return "0.35";
  case "601":
    return "0.35";

  }
}
// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
      style: function (feature) {
          var thisPattern = choosePattern(feature.properties.DISTRICT, feature.properties.NAME);
              thisPattern.addTo(map);

      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on district)
        //fillColor: chooseColor(feature.properties.DISTRICT),
          fillPattern:thisPattern, 
        fillOpacity: chooseOpacity(feature.properties.NAME),
        weight: 1.5
      };
    },
  
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
              fillOpacity: chooseOpacity(feature.properties.NAME)
              
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
              fillOpacity: chooseOpacity(feature.properties.NAME)
              
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        } 

      }); 
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1> District: " + feature.properties.DISTRICT + "</h1> <hr> <h2> Police Service Area: " + feature.properties.NAME + "</h2>");

  },
  }).addTo(map);


    //make the legend


    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["Fewer Cameras", "More Cameras", "Fewer Crimes", "More Crimes"],
            labels = ["static/images/not_shaded.jpg", "static/images/shaded.jpg", "static/images/not_opaque.jpg", "static/images/opaque.jpg"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                grades[i] + (" <img src=" + labels[i] + " height='20' width='20'>") + '<br>';
        }

        return div;
    };

    legend.addTo(map);

 

  





})