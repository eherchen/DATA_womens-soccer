
d3.select("#womensfifa").selectAll("div")
  .data(womenssoccerscrape)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<h3 style="color:red"> <strong>FIFA Ranking: ${d.fifa_ranking}</strong> </h3> <p>Wins: ${d.wins}, Losses: ${d.losses}, Draws: ${d.draws}, Goals: ${d.goals}</p> <p class="small"><i>as of ${d.date}</i></p>
    <hr><p>Latest News: <a href="${d.story_link}">${d.recent_news}</a>, ${d.time_of_story}</p>`
  });

d3.select("#womensimages1").selectAll("div")
  .data(womenssoccerscrape)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<img src="${d.image_link}" height="250">`
  });

// d3.select("#womensimages2").selectAll("div")
//   .data(womenssoccerscrape)
//   .enter()
//   .append("h3")
//   .html(function(d) {
//     return `<img src="${d.image_link2}">`
//   });

// d3.select("#womensimages3").selectAll("div")
//   .data(womenssoccerscrape)
//   .enter()
//   .append("h3")
//   .html(function(d) {
//     return `<img src="${d.image_link3}">`
//   });


d3.select("#mensfifa").selectAll("div")
  .data(menssoccerscrape)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<h3 style="color:red"> <strong>FIFA Ranking: ${d.fifa_ranking}</strong> </h3> <p>Wins: ${d.wins}, Losses: ${d.losses}, Draws: ${d.draws}, Goals: ${d.goals}</p> <p class="small"><i>as of ${d.date}</i></p><hr>
    <p>Latest News: <a href="${d.story_link}">${d.recent_news}</a>, ${d.time_of_story}</p>`
  });

d3.select("#mensimages1").selectAll("div")
  .data(menssoccerscrape)
  .enter()
  .append("h3")
  .html(function(d) {
    return `<img src="${d.image_link}" height="300">`
  });


// d3.select("#gfund").selectAll("div")
//   .data(currentfundprices)
//   .enter()
//   .append("h5")
//   .html(function(d) {
//     if (d.GFundpct >= 0) { return `<h3 style="color:green"> $<strong>${d.GFund}</strong> </h3> <p style="color:green">${d.GFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//     else {return `<h3 style="color:red"> $<strong>${d.GFund}</strong> </h3> <p style="color:red">${d.GFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//   });

// d3.select("#ffund").selectAll("div")
//   .data(currentfundprices)
//   .enter()
//   .append("h5")
//   .html(function(d) {
//     if (d.FFundpct >= 0) { return `<h3 style="color:green"> $<strong>${d.FFund}</strong> </h3> <p style="color:green">${d.FFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//     else { return `<h3 style="color:red"> $<strong>${d.FFund}</strong> </h3> <p style="color:red">${d.FFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//   });


// d3.select("#cfund").selectAll("div")
//   .data(currentfundprices)
//   .enter()
//   .append("h5")
//   .html(function(d) {
//       if (d.CFundpct >= 0) { return `<h3 style="color:green"> $<strong>${d.CFund}</strong> </h3> <p style="color:green">${d.CFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//       else { return `<h3 style="color:red"> $<strong>${d.CFund}</strong> </h3> <p style="color:red">${d.CFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//   });

// d3.select("#sfund").selectAll("div")
//   .data(currentfundprices)
//   .enter()
//   .append("h5")
//   .html(function(d) {
//       if (d.SFundpct >= 0) { return `<h3 style="color:green"> $<strong>${d.SFund}</strong> </h3> <p style="color:green">${d.SFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//       else { return `<h3 style="color:red"> $<strong>${d.SFund}</strong> </h3> <p style="color:red">${d.SFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//   });

// d3.select("#ifund").selectAll("div")
//   .data(currentfundprices)
//   .enter()
//   .append("h5")
//   .html(function(d) {
//       if (d.IFundpct >= 0) { return `<h3 style="color:green"> $<strong>${d.IFund}</strong> </h3> <p style="color:green">${d.IFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
//       else { return `<h3 style="color:red"> $<strong>${d.IFund}</strong> </h3> <p style="color:red">${d.IFundpct}%</p> <footer class="blockquote-footer"><i>as of ${d.date}</i></footer>` }
// })