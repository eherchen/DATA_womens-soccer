d3.select("#tweetscrapetime").selectAll("a")
  .data(recenttweets)
  .enter()
  .append("p")
  .html(function(d) {
    return `<p class="small"><i>as of ${d.date}</i></p>`
  });

d3.select("#tweet1").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet1}</p>`
  });
d3.select("#tweet2").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet2}</p>`
  });
d3.select("#tweet3").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet3}</p>`
  });
d3.select("#tweet4").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet4}</p>`
  });

d3.select("#tweet5").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet5}</p>`
  });

d3.select("#tweet6").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet6}</p>`
});

d3.select("#tweet7").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet7}</p>`
});

d3.select("#tweet8").selectAll("div")
  .data(recenttweets)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<p>${d.tweet8}</p>`
});

