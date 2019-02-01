//key: f3edbcdbd0288fb42075aa17d416607c


$(function(){
	let $curse_EN = $('.curse_EN_info i');
	let $curse_EU = $('.curse_EU_info i');
	let $menuButton = $('.menu-button');
	let $menu = $('.menu-container');
	let $search = $('.search');

	let data = $.get('http://data.fixer.io/api/latest', {access_key:'f3edbcdbd0288fb42075aa17d416607c'/*, base:"RUB"....Низя((*/},function(response){
		console.log(response)
		if(response['rates']['USD']){
			$curse_EN.text(response['rates']['USD']);
			$curse_EU.text(response['rates']['RUB']);
		}
	});

	$menuButton.click(function(event) {
		$menu.toggleClass('menu-active');
		$('body').toggleClass('body_fixed');	
	});
})