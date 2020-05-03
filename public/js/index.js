const formButton = $('#form-button');
const formInputName = $('#form-input-name');
const formInputQuantity = $('#form-input-quantity');
const formInputCategory = $('#form-input-category');
// same as $(document).ready()
$(async function () {
	formButton.on('click', addGrocery);

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
	$('#personal-list').empty();
	$('#other-list').empty();
}

function removeItem(event) {
	const id = event.target.getAttribute('data-id');
	$.ajax({
		url: `/api/${id}`,
		type: 'DELETE',
		success: function (result) {
			location.reload();
		}
	});
}
// function saveItem(event) {
// 	const id = event.target.getAttribute('data-id');
// 	$.ajax({
// 		url: `/api/${id}`,
// 		type: 'PUT',
// 		success: function (result) {
// 			location.reload();
// 		}
// 	});
// }

function createListElements(data) {
	data.forEach((item) => {
		let newItem = $(
			`<li class="uk-margin"><button id="test" data-id="${item.id}" class="uk-button uk-button-default uk-button-small list-button-remove">remove</button> <input class="list-input" type="text" value="${item.quantity} ${item.name}"></li>`
		);
		switch (item.category) {
			case 'produce':
				$('#produce-list').append(newItem);
				break;
			case 'meat':
				$('#meat-list').append(newItem);
				break;
			case 'dairy':
				$('#dairy-list').append(newItem);
				break;
			case 'dry':
				$('#dry-list').append(newItem);
				break;
			case 'baked':
				$('#baked-list').append(newItem);
				break;
			case 'ethnic':
				$('#ethnic-list').append(newItem);
				break;
			case 'personal':
				$('#personal-list').append(newItem);
				break;
			case 'other':
				$('#other-list').append(newItem);
				break;
		}
	});
	const removeButtonArr = $('.list-button-remove');
	const saveButtonArr = $('.list-button-save');
	if (removeButtonArr.length == 1) {
		removeButtonArr.on('click', removeItem);
	} else if (removeButtonArr.length > 1) {
		$.each(removeButtonArr, (index, button) => {
			button.addEventListener('click', removeItem);
		});
	}
	// if (saveButtonArr.length == 1) {
	// 	saveButtonArr.on('click', removeItem);
	// } else if (saveButtonArr.length > 1) {
	// 	$.each(saveButtonArr, (index, button) => {
	// 		button.addEventListener('click', saveItem);
	// 	});
	// }
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
