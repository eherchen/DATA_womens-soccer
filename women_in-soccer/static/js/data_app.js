
var tableData = data;

var tbody = d3.select("tbody");

tableData.forEach((camExpense) => {
    var row = tbody.append("tr");
    Object.entries(camExpense).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

var submit = d3.select("#filter-btn");

submit.on("click", function() {
  
    d3.event.preventDefault();

    d3.selectAll("tr").remove()
  
    var inputPSA = d3.select("#psa");
    var inputDistrict = d3.select("#district");
  
    var inputPSAValue = inputPSA.property("value");
    var inputDistrictValue = inputDistrict.property("value")

  
  
    var filteredPSAData = tableData.filter(tableData => tableData.PSA === inputPSAValue);
    var filteredDistrictData = tableData.filter(tableData => tableData.District === inputDistrictValue);

    

    filteredPSAData.forEach((cam) => {
      var row = tbody.append("tr");
      Object.entries(cam).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });

    filteredDistrictData.forEach((cam) => {
      var row = tbody.append("tr");
      Object.entries(cam).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });

});

