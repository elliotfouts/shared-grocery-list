const formButton = $('#form-button');
const formInputName = $('#form-input-name');
const formInputQuantity = $('#form-input-quantity');
const formInputCategory = $('#form-input-category');
// same as $(document).ready()
$(async function () {
	formButton.on('click', addGrocery);
	clearGroceryList(); // to add red default color
	populateGroceryList();
});

function populateGroceryList() {
	$.get('/api', function (data) {
		createListElements(data);
	});
}

function clearGroceryList() {
	$('#produce-list').empty();
	$('#meat-list').empty();
	$('#dairy-list').empty();
	$('#dry-list').empty();
	$('#baked-list').empty();
	$('#ethnic-list').empty();
	$('#baking-list').empty();
	$('#beverages-list').empty();
	$('#cleaning-list').empty();
	$('#personal-list').empty();
	$('#other-list').empty();
	$('#produce-list-title').css("color", "#fa8b8b");
	$('#meat-list-title').css("color", "#fa8b8b");
	$('#dairy-list-title').css("color", "#fa8b8b");
	$('#dry-list-title').css("color", "#fa8b8b");
	$('#baked-list-title').css("color", "#fa8b8b");
	$('#ethnic-list-title').css("color", "#fa8b8b");
	$('#baking-list-title').css("color", "#fa8b8b");
	$('#beverages-list-title').css("color", "#fa8b8b");
	$('#cleaning-list-title').css("color", "#fa8b8b");
	$('#personal-list-title').css("color", "#fa8b8b");
	$('#other-list-title').css("color", "#fa8b8b");
}

function removeItem(event) {
	const id = event.target.getAttribute('data-id');
	$.ajax({
		url: `/api/${id}`,
		type: 'DELETE',
		success: function (result) {
			clearGroceryList();
			populateGroceryList();
		}
	});
}

function createListElements(data) {
	data.forEach((item) => {
		let newItem = $(
			`<li class="uk-margin"><button id="test" data-id="${item.id}" class="uk-button uk-button-default uk-button-small list-button-remove">remove</button> ${item.quantity} ${item.name}</li>`
		);
		switch (item.category) {
			case 'produce':
				$('#produce-list').append(newItem);
				$('#produce-list-title').css("color","#4ca050");
				break;
			case 'meat':
				$('#meat-list').append(newItem);
				$('#meat-list-title').css("color", "#4ca050");
				break;
			case 'dairy':
				$('#dairy-list').append(newItem);
				$('#dairy-list-title').css("color", "#4ca050");
				break;
			case 'dry':
				$('#dry-list').append(newItem);
				$('#dry-list-title').css("color", "#4ca050");
				break;
			case 'baked':
				$('#baked-list').append(newItem);
				$('#baked-list-title').css("color", "#4ca050");
				break;
			case 'ethnic':
				$('#ethnic-list').append(newItem);
				$('#ethnic-list-title').css("color", "#4ca050");
				break;
			case 'baking':
				$('#baking-list').append(newItem);
				$('#baking-list-title').css("color", "#4ca050");
				break;
			case 'beverages':
				$('#beverages-list').append(newItem);
				$('#beverages-list-title').css("color", "#4ca050");
				break;
			case 'cleaning':
				$('#cleaning-list').append(newItem);
				$('#cleaning-list-title').css("color", "#4ca050");
				break;
			case 'personal':
				$('#personal-list').append(newItem);
				$('#personal-list-title').css("color", "#4ca050");
				break;
			case 'other':
				$('#other-list').append(newItem);
				$('#other-list-title').css("color", "#4ca050");
				break;
		}
	});
	const removeButtonArr = $('.list-button-remove');
	if (removeButtonArr.length == 1) {
		removeButtonArr.on('click', removeItem);
	} else if (removeButtonArr.length > 1) {
		$.each(removeButtonArr, (index, button) => {
			button.addEventListener('click', removeItem);
		});
	}
}

function addGrocery(event) {
	event.preventDefault();
	let newGrocery = {};
	newGrocery.name = formInputName.val().trim().toLowerCase();
	newGrocery.quantity = formInputQuantity.val().trim();
	newGrocery.category = formInputCategory.val().trim();
	if (newGrocery.name == "" || newGrocery.quantity == "" || newGrocery.category == "") {
		UIkit.notification('Please fill out all fields', 'danger');
	} else {
		$.ajax({
			type: 'POST',
			url: '/',
			data: newGrocery,
			success: loadData,
			error: loadError
		});
	}
}

function clearFormInputs() {
	formInputName.val('');
	formInputQuantity.val('');
}

function loadData(data) {
	console.log('test');
	UIkit.notification('Item was added to grocery list', 'success');
	clearGroceryList();
	populateGroceryList();
	clearFormInputs();
}

function loadError() {
	UIkit.notification('That is already on the list...', 'danger');
	clearFormInputs();
}
