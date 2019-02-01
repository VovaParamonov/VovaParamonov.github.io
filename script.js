//key: f3edbcdbd0288fb42075aa17d416607c


$(function(){
	let $curse_EN = $('.curse_EN_info i');
	let $curse_EU = $('.curse_EU_info i');
	let $menuButton = $('.menu-button');
	let $menu = $('.menu-container');
	let $search = $('.search');
	let $logo = $('#logo');

	let data = $.get('http://data.fixer.io/api/latest', {access_key:'f3edbcdbd0288fb42075aa17d416607c'/*, base:"RUB"....Низя((*/},function(response){
		console.log(response)
		if(response['rates']['USD']){
			$curse_EN.text(response['rates']['USD']);
			$curse_EU.text(response['rates']['RUB']);
		}
	});

	$search.focus(function(){
		$logo.hide();
		$(this).css({'width':'200px', "background-position":"94% 50%"});
	}).focusout(function(event) {
		$(this).css({'width':'45px', "background-position":"center"});
		$logo.show()
	});

	$menuButton.click(function(event) {
		$(this).toggleClass('menu-cros');
		$menu.toggleClass('menu-active');
		$('body').toggleClass('body_fixed');	
	});
})