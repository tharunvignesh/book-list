// Book constructor
function Book(title, author, isbn) {
	this.title = title
	this.author = author
	this.isbn = isbn
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
	const list = document.getElementById('book-list')
	// create tr element
	const row = document.createElement('tr')
	// insert cols
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a class="delete">X</a></td>
	`
	list.appendChild(row)
}

UI.prototype.clearFields = function () {
	document.getElementById('title').value = ''
	document.getElementById('author').value = ''
	document.getElementById('isbn').value = ''
}

UI.prototype.showAlert = function (message, classname) {
	// create new div
	const newDiv = document.createElement('div')
	// add classes
	newDiv.className = `alert ${classname}`
	// add text
	newDiv.appendChild(document.createTextNode(message))
	// get parent
	const container = document.querySelector('.container')
	// get form
	const form = document.querySelector('#book-form')
	// insert alert before form
	container.insertBefore(newDiv, form)

	setTimeout(() => {
		document.querySelector('.alert').remove()
	}, 4000)
}

UI.prototype.deleteBook = (target) => {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove()
	}
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
	// get form values
	const title = document.getElementById('title').value
	const author = document.getElementById('author').value
	const isbn = document.getElementById('isbn').value

	// instantiate book
	const book = new Book(title, author, isbn)
	// instantiate ui
	const ui = new UI()

	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Please enter all fields', 'error')
	} else {
		// add book to list
		ui.addBookToList(book)
		ui.showAlert('Book Added', 'success')
		ui.clearFields()
	}
	e.preventDefault()
})

// event listener for delete

document.getElementById('book-list').addEventListener('click', (e) => {
	const ui = new UI()

	ui.deleteBook(e.target)
	ui.showAlert('book deleted', 'success')
})
