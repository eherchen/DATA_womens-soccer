d3.select("#scrapedatetime").selectAll("a")
  .data(lateststories)
  .enter()
  .append("p")
  .html(function(d) {
    return `<p class="small"><i>as of ${d.currentdatetime}</i></p>`
  });

d3.select("#googlenews").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url1}">${d.title1}</a>`
  });
d3.select("#googlenews2").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url2}">${d.title2}</a>`
  });
d3.select("#googlenews3").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url3}">${d.title3}</a>`
  });
d3.select("#googlenews4").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url4}">${d.title4}</a>`
  });

d3.select("#googlenews5").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url5}">${d.title5}</a><br>`
  });

d3.select("#googlenews6").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url6}">${d.title6}</a><br>`
});

d3.select("#googlenews7").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url7}">${d.title7}</a><br>`
});

d3.select("#googlenews8").selectAll("div")
  .data(lateststories)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<a href="${d.url8}">${d.title8}</a><br>`
});

