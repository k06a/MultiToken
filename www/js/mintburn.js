$(".mintburn").click(function(){
	if($('#myInput').val() == ""){
		$('#myInput').fadeTo(100, 0.1).fadeTo(200, 1.0);
		alert("Set manage token address");
		return;
	}

	if($('#amount').val() == ""){
		$('#amount').fadeTo(100, 0.1).fadeTo(200, 1.0);
		alert("Set amount");
		return;
	} 
	if(isNaN($('#amount').val())){
		$('#amount').fadeTo(100, 0.1).fadeTo(200, 1.0);
		alert("Amount must be a number");
		return;
	}

	mintburn(this.id, $('#amount').val(), $('#myInput').val(), $('#myInput_address').html());

});

$('#myUL > li > a').click(function(){
	$('#myInput_address').html(this.id);
	$('#myInput').val($(this).html());
});

$('#myInput').on('input change', function(){
	var token_address = "";

	$('#myUL > li > a').each(function(_index){
		console.log($('#myInput').val(), $(this).html());
		if($('#myInput').val() == $(this).html())	
			token_address = this.id;

		if(_index == $('#myUL > li > a').length - 1){
			if(token_address == "")
				$('#myInput_address').html('');
			else
				$('#myInput_address').html(token_address);
		}
	});
});