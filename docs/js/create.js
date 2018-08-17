var symbol_not_changed_by_user = 1;

$("#add").click(function(){
	var max_index = 2;
	$("[name='del']").each(function(){
		if(this.id.split('add')[1] > max_index)
			max_index = this.id.split('add')[1];
	});
	var index = parseInt(max_index, 10) + 1;
	
	var newdrop = getHTMLdrop(index);
	$('#drops').append(newdrop);
	$("[name='del']").click(function(){
		$('#drop'+this.id.split('add')[1]).remove();
	});
	$("[name='ul_menu'] > li > a").click(function(){
		$('#menu'+this.id.split('_')[1]).html($(this).html()+' <span class="caret"></span>');
	});
	$('#ex'+index).slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});

});

$("[name='ul_menu'] > li > a").click(function(){
	$('#menu'+this.id.split('_')[1]).html($(this).html()+' <span class="caret"></span>');
});
$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});
$('#ex2').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});

$("#create").click(function(){
	if($('#token_name').val() == ""){
		$('#token_name').fadeTo(100, 0.1).fadeTo(200, 1.0);
		alert("Set token name");
		return;
	}
	
	var manageable = $('#manageable').prop('checked');
	var addresses = [];
	var coins_symbol = {};
	var weight = {};
	var stop_flag = 0;
	$('#drops > div > div > button').each(function(_i){
		if( $(this).html().split(' ')[0] != 'x'){
			var address = "";
			var coin = $(this).html().split(' ')[0];
			var menu_id = this.id.split('menu')[1];
			$('#drop'+menu_id+' > ul > li > a').each(function(_index){
				if($(this).html() == coin)
					address = this.id.split('_')[2];

				if( _index == $('#drop'+menu_id+' > ul > li > a').length - 1) {
					if(address == ""){
						alert("Select Coin"+menu_id);
						stop_flag = 1;
					} else {
						addresses.push(address);
						coins_symbol[address] = coin;
						weight[address] = $('#ex'+menu_id).val();
					}
				}
			});
		}

		if(_i == $('#drops > div > div > button').length - 1){
			if(stop_flag == 1){
				return;
			}

			if(addresses.length != unique(addresses).length){
				alert("Select different Coins");
			} else {
				if(symbol_not_changed_by_user == 1){
					var symbol = "";
					for(var i = 0; i < addresses.length; i++){
						if(i != 0)
							symbol += "_";
						symbol += weight[addresses[i]] + coins_symbol[addresses[i]];
					}
					$('#symbol').val(symbol);
				}
				start($('#token_name').val(), $('#symbol').val(), addresses, weight, manageable);
			}
		}
	});
});

$('#symbol').on('input change', function(){
	symbol_not_changed_by_user = 0;
});

$('#btn-init').click(function(){
	var init_amounts = [];
	var result = "";
	$("[name='init_amount']").each(function(_index){
		if(isNaN($(this).val()) || $(this).val() == "")
			result += $('#drop'+this.id.split('init_amount')[1]+' > button').html().split(' ')[0] + " ";
		else
			//init_amounts[$('#drop'+this.id.split('init_amount')[1]+' > button').html().split(' ')[0]] = $(this).val() / 1e18;
			init_amounts.push($(this).val() * 1e18);
		
		console.log(result);
		if(_index == $("[name='init_amount']").length - 1){
			if(result != "")
				alert("Fill count Coins for init contract: " + result);
			else
				init_contract(init_amounts);
		} 
		
	});
});

function getHTMLdrop(num){
	return '<div class="form-group"><div class="dropdown" id="drop'+num+'"><button class="btn btn-default dropdown-toggle" type="button" id="menu' + num + '" data-toggle="dropdown">Coin' + num + ' <span class="caret"></span></button>&nbsp;&nbsp;&nbsp;<input id="ex'+num+'" data-slider-id="ex1Slider" type="text" data-slider-min="1" data-slider-max="10" data-slider-step="1" data-slider-value="1"/>&nbsp;&nbsp;&nbsp;<input type="text" class="form" name="init_amount" id="init_amount'+num+'"> <ul class="dropdown-menu" role="menu" aria-labelledby="menu' + num + '" name="ul_menu"><li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="ulmenu_'+num+'_0xd26114cd6EE289AccF82350c8d8487fedB8A0C07">OMG</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="ulmenu_'+num+'_0xe94327d07fc17907b4db788e5adf2ed424addff6">REP</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="ulmenu_'+num+'_0xa74476443119A942dE498590Fe1f2454d7D4aC0d">GNT</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="ulmenu_'+num+'_0x744d70fdbe2ba4cf95131626614a1763df805b9e">SNT</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="ulmenu_'+num+'_0x0d8775f648430679a709e98d2b0cb6250d2887ef">BAT</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="ulmenu_'+num+'_0x6810e776880c02933d47db1b9fc05908e5386b96">GNO</a></li> </ul><button type="button" class="btn btn-danger" name="del" id="add' + num + '">x</button></div>';
}

function unique(arr) {
	var obj = {};

	for (var i = 0; i < arr.length; i++) {
		var str = arr[i];
		obj[str] = true; 
	}

	return Object.keys(obj); 
}
