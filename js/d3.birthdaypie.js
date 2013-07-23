d3.birthdaypie = function(containerId,width) {

  //Init vars
  var chart,
      groups;  
  var height = 500,
      radius = Math.min(width, height) / 3,
      labelr = radius + 30,
      color = d3.scale.category20(),
      pie,
      arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);

  function _createChart(){
    //create svg
    chart = d3.select('#'+containerId)
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  }

  function _createElements(){

    pie = d3.layout.pie()
      .value(function(d) { return d.qty; })
      .sort(null);
    
    groups = chart.datum(data)
      .selectAll("g")
      .data(pie)
      .enter()
      .append("g");

    path = groups
      .append("path")
      .attr("fill", function(d, i) { return "rgb( " + (d.data.qty * 10) + ",0,0)"; })
      .attr("d", arc);

    groups.append("text")
    .attr("transform", function(d) {
        var c = arc.centroid(d),
            x = c[0],
            y = c[1],
            // pythagorean theorem for hypotenuse
            h = Math.sqrt(x*x + y*y);
        return "translate(" + (x/h * labelr) +  ',' + (y/h * labelr) +  ")"; 
    })
    .attr("dy", "-0.5em")
    .attr("dx", "-1em")
    .attr("fill", function(d, i) { return "rgb( " + (d.data.qty * 10) + ",0,0)"; })
    .attr("text-anchor", function(d) {
        // are we past the center?
        return (d.endAngle + d.startAngle)/5 > Math.PI ?"end" : "start";
    })
    .text(function(d, i) { return d.data.name; });

  }

  return {
    setData: function(newData){
      data = newData;
      _createChart();
      _createElements();
    },   
    sort: function(type){

      var newData = data;

      switch(type){
        case 'qty-asc':
          newData.sort(function(a, b) { return a.qty - b.qty; });
        break;
        case 'qty-desc':
          newData.sort(function(a, b) { return b.qty - a.qty; });
        break;
        case 'name-asc':
          newData.sort(function(a, b) { 
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
          });
        break;
        case 'name-desc':
          newData.sort(function(a, b) { 
            if(a.name > b.name) return -1;
            if(a.name < b.name) return 1;
            return 0;
          });
        break;
      }

      data = newData;

      _createElements();
    }
  }

}
