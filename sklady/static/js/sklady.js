function updateBasket()
{
	var basket = $("#basketBody");

	basket.empty();

	if (!sessionStorage.length){
		$('<tr><td colspan="3">Košík je prázdný.</td></tr>').appendTo(basket);
		$('#submitOrder').prop('disabled', true);
		$('#clearBasket').prop('disabled', true);
	}
	else{
		$('#submitOrder').prop('disabled', false);
		$('#clearBasket').prop('disabled', false);
	}

	for (var i = 0; i < sessionStorage.length; i++) {
		var row = $('<tr></tr>').appendTo(basket);
		var label = $('<td></td>').appendTo(row);
		var amount = $('<td></td>').appendTo(row);
		var button = $('<td></td>').appendTo(row);
		var remove = $('<button class="btn btn-sm btn-danger">Odebrat</button>').appendTo(button);

		label.text(sessionStorage.key(i));
		amount.text(sessionStorage.getItem(sessionStorage.key(i)));

		(function() {
			var id = i;
			var name = sessionStorage.key(i);

			remove.click(function(event) {
				event.preventDefault();
				var tableRow = $('#inventory td').filter(function(){
					return $(this).text() == name;
				}).closest('tr');
				var input = $(':nth-child(4)',tableRow).find('input');
				input.attr('max', input.data('max'));
				sessionStorage.removeItem(name);
				updateBasket();
			});
		})();
	}
}

$(function() {
	$('.row-form').submit(function(event) {
		event.preventDefault();
		/* get form data */
		var id = $(this).data('id');
		var name = $(this).data('name');
		var count = $('#'+id).val() || 1;
		
		if(parseInt($('#' + id).attr('max')) < parseInt(count)){
			$('.alert').fadeIn(400,'linear');
			window.setTimeout( function () {
				$('.alert').fadeOut(400,'linear');
			},3000);
		return false;
		}
		/* decrease max amount availible by ordered amount */
		 $('#'+id).prop('max', parseInt($('#'+id).attr('max')) - parseInt(count));
		
		/* update basket item count */
		if(sessionStorage.getItem(name)!=null){
		var actualCount = sessionStorage.getItem(name);
		sessionStorage.setItem(name,parseInt(count) + parseInt(actualCount));
		updateBasket();		
		}
		else{
		sessionStorage.setItem(name, count);
		updateBasket();
		}
	});
});

$(document).ready(function() {
	$('#inventory').DataTable({pageLength: 25});
	for(var i = 0; i < sessionStorage.length; i++){
                var name = sessionStorage.key(i);
                var quantity = sessionStorage.getItem(sessionStorage.key(i));
                var tableRow = $('#inventory td').filter(function(){
                        return $(this).text() == name;
                }).closest('tr');
                var input = $(':nth-child(4)',tableRow).find('input');
                input.attr('max', input.attr('max') - quantity);
                }

	updateBasket();
});

$(function() {
$("#clearBasket").click(function(event) {
		event.preventDefault();
		$('#basket tr').each(function(){
		var name = $(this).children()[0].innerText;
		var tableRow = $('#inventory td').filter(function(){
			return $(this).text() == name;
		}).closest('tr');
		var input = $(':nth-child(4)',tableRow).find('input');
		input.attr('max', input.data('max'));
		});
		sessionStorage.clear();
		updateBasket();
	});
});

$(function() {
$("#submitOrder").click(function(event) {
                event.preventDefault();
		var body = encodeURI("Dobrý den, \ntímto žádám o následující položky ze skladu: \n\n")
		$('#basket tr').each(function(){
		if($(this).children()[0].innerText == 'Název'){
		return true;
		}
                var name = $(this).children()[0].innerText;
		var quantity = $(this).children()[1].innerText;
		body += encodeURI(name + ": " + quantity + "\n");
		var tableRow = $('#inventory td').filter(function(){
                        return $(this).text() == name;
                }).closest('tr');
                var input = $(':nth-child(4)',tableRow).find('input');
                input.attr('max', input.data('max'));
		})
		body += encodeURI('\n' + $(this).data('firstname') + ' ' + $(this).data('lastname'));
		window.open('mailto:zdenka.bila@techlib.cz?subject=Objednávka ' + Date.now() + '&body=' + body, '_self');
                sessionStorage.clear();
                updateBasket();
		
		/* alert("Objednávka odeslána."); */
        });
});
