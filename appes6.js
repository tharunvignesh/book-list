// Book class
class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

// UI class
class UI {
	addBookToList(book) {
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
	showAlert(message, classname) {
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
	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove()
		}
	}
	clearFields() {
		document.getElementById('title').value = ''
		document.getElementById('author').value = ''
		document.getElementById('isbn').value = ''
	}
}

// storage class
class Store {
	static getBooks() {
		let books
		if (localStorage.getItem('books') === null) {
			books = []
		} else {
			books = JSON.parse(localStorage.getItem('books'))
		}

		return books
	}
	static displayBooks() {
		let books = Store.getBooks()
		console.log(books)
		books.forEach((book) => {
			const ui = new UI()
			ui.addBookToList(book)
		})
	}
	static addBook(book) {
		let books = Store.getBooks()
		books.push(book)
		localStorage.setItem('books', JSON.stringify(books))
	}
	static removeBook(target) {
		const isbn = target.parentElement.previousElementSibling.textContent
		let books = Store.getBooks()
		books.forEach((book, index) => {
			if (isbn === book.isbn) {
				books.splice(index, 1)
			}
		})

		localStorage.setItem('books', JSON.stringify(books))
	}
}

// Event Listeners
// for content loaded
document.addEventListener('DOMContentLoaded', Store.displayBooks())
// for submit form
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
		// add to local storage
		Store.addBook(book)
		// add book to list
		ui.addBookToList(book)
		ui.showAlert('Book Added', 'success')
		ui.clearFields()
	}
	e.preventDefault()
})

// event listener for delete

document.getElementById('book-list').addEventListener('click', ({ target }) => {
	// instantiate ui
	const ui = new UI()

	// delete book
	ui.deleteBook(target)

	// Show Alert message
	ui.showAlert('book deleted', 'success')

	// remove book from local Storage
	Store.removeBook(target)
})
