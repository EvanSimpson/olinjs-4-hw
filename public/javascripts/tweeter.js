$(function(){


	function getFeed(){
		$.get('/tweets/list', function(data){
			$('#tweetFeed').html(data);
		});
	};


	$('#signinForm').on('submit', function(){
		$.post('/users/create', $('#signinForm').serialize());
		$('#login').hide();
		$('#composeTweet').show();
		$('#tweetFeed').show();
		$.get('/tweets/new', function(data){
			$('#composeTweet').html(data);
		});
		getFeed();
		return false;
	});


	$('#compose').on('submit', function(){
		$.post('/tweets/post', $('#compose').serialize());
		$('#tweetText').val('');
		return false;
	});


	setInterval(getFeed,5000);

});