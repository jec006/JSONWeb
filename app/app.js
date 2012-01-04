/**
 *  @file - Provides the actual logic that we want to use to create our page
 *  TODO: Provide an example app
 */


function makeSite(req) {
  var obj = JSON.parse(req.responseText);
  var ren = Renderable.create(obj);
  var el = ren.attach(document.body);
  el.style.backgroundColor = 'red'; //set the background color of the attached element
}

//Grab some json from our example folder
niceAjax('app/examplejson/index.json', '', makeSite);



