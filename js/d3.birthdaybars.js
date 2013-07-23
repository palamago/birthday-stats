d3.birthdaybars = function(containerId,width) {

  //Init vars
  var chart,
      bar_height = 20,
      height,
      x,
      y,
      lines,
      groups,
      left_width = 100,
      padding_top = 30,
      padding_bottom = 5,
      padding_left = 10,
      names,
      index,
      gap = 2,
      xAxis;
  
  function _setScales(){
    //Scales
    x = d3.scale.linear()
       .domain([0, d3.max(data, function(d){return d.qty;})])
       .range([0, width-left_width-padding_left]);

    y = d3.scale.ordinal()
       .domain(index)
       .rangeBands([0, (bar_height + 2 * gap) * data.length]);
  }

  function _createChart(){
    //create svg
    chart = d3.select('#'+containerId)
      .append('svg')
      .attr('height', (bar_height + gap * 2) * data.length + gap * 2 + padding_top + padding_bottom) 
      .attr('width', width);

  }

  function _createAxis(){
    xAxis = d3.svg.axis()
      .scale(x)
      .orient('top')
      .tickSubdivide(1)
      .tickSize(5)
      .tickPadding(5);

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate('+left_width+', '+padding_top+')')
        .call(xAxis);
  }

  function _createElements(){
    //create groups
    groups = chart.selectAll("g.greeting-group")
      .data(data)
      .enter()
      .append("g")
      .attr('class','greeting-group')
      .attr('id',function(d){
        return 'greeting-group-'+d.id;
      });

    //update position
    chart.selectAll("g.greeting-group")
    .transition()
    .duration(1000)
    .attr("transform", function(d, i) {
      //Cálculo de la variación
      var posX = 0;
      var posY = y(i)+padding_top+gap*2;
//      debugger;
      return ("translate(" + posX + "," + posY + ")");
    });

    //create bars
    lines = groups.append("rect")
      .attr("width", function(d,i){
        return x(d.qty);
      })
      .attr('x',left_width)
      .attr("height", bar_height)
      .attr("fill", function(d) {
          return "rgb( " + (d.qty * 10) + ",0,0)";
      });
    
    //add labels
    numbers = groups
      .append("text")
      .attr("class", "qty")
      .attr("x", function(d){
        return x(d.qty)+left_width;
      })
      .attr("y", function(d){ return y.rangeBand()/2; } )
      .attr("dx", -5)
      .attr("dy", ".20em")
      .attr("text-anchor", "end")
      .text(function(d){return d.qty;});

    //names
    names = groups
      .append("text")
      .attr("class", "name")
      .attr("x",0)
      .attr("y", function(d){ return y.rangeBand()/2; } )
      .attr("dx", left_width-10)
      .attr("dy", ".20em")
      .attr("text-anchor", "end")
      .text(function(d){return d.name;});

  }

  /* //update positions  
  lines
    .transition()
    .duration(1000)
    .attr("y", function(d,i){
        return y(i);
      } 
    );*/



  return {
    setData: function(newData){
      data = newData;
      height = data.length*bar_height;
      index = d3.range(data.length);
      _setScales();
      _createChart();
      _createAxis();
      _createElements();
    },   
    sort: function(type){

      switch(type){
        case 'qty-asc':
          index.sort(function(a, b) { return data[a].qty - data[b].qty; });
        break;
        case 'qty-desc':
          index.sort(function(a, b) { return data[b].qty - data[a].qty; });
        break;
        case 'name-asc':
          index.sort(function(a, b) { 
            if(data[a].name < data[b].name) return -1;
            if(data[a].name > data[b].name) return 1;
            return 0;
          });
        break;
        case 'name-desc':
          index.sort(function(a, b) { 
            if(data[a].name > data[b].name) return -1;
            if(data[a].name < data[b].name) return 1;
            return 0;
          });
        break;
      }
      
      _setScales();
      _createElements();
    }
  }

}
