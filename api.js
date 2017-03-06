
var apiApp={}


apiApp.init = function(){
	apiApp.getBeerInfo();
	apiApp.events();
}

apiApp.getBeerInfo = function(){
	$.ajax({
		url: "https://api.punkapi.com/v2/beers?page=2&per_page=25",
		method: "GET",
		dataType: "json",
	})
	.then(function(data){
		apiApp.displayBeerInfo(data)
	});
};
apiApp.displayBeerInfo = function(data){
	var data=_.sortBy(data,"abv")
	data.forEach(function(data){
		var beerName = $("<h2>").text(data.name);
		var tagLine = $("<h3>").text(data.tagline);
		var abv = $("<h4>").addClass("abv").text(data.abv + "%");
		var beerDescription = $("<p>").text(data.description);
		var beerImage = $("<img>").attr("src", data.image_url);
		var heading = $("<p>").addClass("food").text("This beer tastes great with...") 
		var foodList = $("<ul>")
		var content = $("<div>").addClass("container").append( beerDescription, heading, foodList)
		data.food_pairing.forEach(function(foodPairing){
			foodList.append("<li>" + foodPairing + "</li>");
		});
		var beer = $("<div>").append (beerImage, beerName, tagLine, abv, content)
		if (data.abv >= 7){
			beer.addClass("strong clearfix")
		} else{
			beer.addClass("weak clearfix");
		} 
		$(".explore").append(beer);
	}); console.log(data);
};
apiApp.events = function(){

	$(".type-button").on("click", function(e){
		$(".explore").show();
		var strengthOfBeer = e.target.className;
		if(strengthOfBeer === "strong type-button") {
			$("section div.weak").addClass("hide");
			$("section div.strong").removeClass("hide");
		} else if (strengthOfBeer === "weak type-button") {
			$("section div.strong").addClass("hide");
			$("section div.weak").removeClass("hide");
		}
	})
}
$(function(){
	apiApp.init();
})