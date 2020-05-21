var allQuakeHourURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

// console.log(allQuakeHourURL);

d3.json(allQuakeHourURL, function(data) {
    createFeatures(data.features);
});



function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
        
    }



var earthquakes = L.geoJSON(earthquakeData, {
    //console.log(quakedata);
    onEachFeature: onEachFeature
});

    createMap(earthquakes);
}
  function createMap(earthquakes) { 


var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiZGVyZWtncmVlbGV5IiwiYSI6ImNrOXpxcWEzNzBlOHczaW52b2JrdjIwemQifQ.QWHYtJpQouqR_rE2OAFmTw"
  });

var baseMaps = {
       "Street Map": lightMap
    };

var overlayMaps = {
    "Earthquakes": earthquakes
  };


  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightMap, earthquakes]
  });


    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        labels = [];
  
        div.innerHTML+='Magnitude<br><hr>'
    
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + "cyan" + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    
    return div;
    };
    
    legend.addTo(myMap); {
  
  };

}
  // pointToLayer: function(feature, latlang) {
    //         var color;
    //         var r = 255;
    //         var g = math.floor(255-80*feature.properties.mag);
    //         var b = math.floor(255-80*feature.properties.mag);
    //         color = "rgb("+r+" , "+g+", "+b+")"
            
    //         var geoJsonMarkOpt = {
    //             radius: 4*feature.properties.mag,
    //             fillColor: color,
    //             color: "black",
    //             weight: 1,
    //             opacity: 1,
    //             fillOpacity:0.8
    //         };
    //         return L.circleMarker(latlang, geoJsonMarkOpt);
    //     }

    
    // function getColor(d) {
    //     // return d < 1 ? 'rgb(255,255,255)' :
    //     //       d < 2  ? 'rgb(255,225,225)' :
    //     //       d < 3  ? 'rgb(255,195,195)' :
    //     //       d < 4  ? 'rgb(255,165,165)' :
    //     //       d < 5  ? 'rgb(255,135,135)' :
    //     //       d < 6  ? 'rgb(255,105,105)' :
    //     //       d < 7  ? 'rgb(255,75,75)' :
    //     //       d < 8  ? 'rgb(255,45,45)' :
    //     //       d < 9  ? 'rgb(255,15,15)' :
    //     //                   'rgb(255,0,0)';
    // }
  