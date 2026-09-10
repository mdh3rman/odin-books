const myLibrary = []

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function () {
    this.read = !this.read
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}


const btnNewBook = document.getElementById('new-book')
const bookForm = document.getElementById('book-form')

btnNewBook.onclick = function () {
    bookForm.style.display = 'block'
}

bookForm.onsubmit = function (event) {
    event.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked

    const newBook = new Book(title, author, pages, read)
    addBookToLibrary(newBook)
    displayBooks()

    bookForm.reset()
    bookForm.style.display = 'none'
}

function removeBook(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId)
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1)
        displayBooks()
    }
}

function toggleRead(bookId) {
    const book = myLibrary.find((book) => book.id === bookId)
    if (book) {
        book.toggleRead()
        displayBooks()
    }
}

const bookList = document.getElementById('book-list')

function displayBooks() {
    bookList.innerHTML = ''

    myLibrary.forEach((book) => {
        const bookItem = document.createElement('div')
        bookItem.classList.add('book-item')
        bookItem.innerHTML = `
            <div data-book-id="${book.id}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'} <button id="toggle-read" onclick="toggleRead('${book.id}')">Toggle</button></p>
            <button id="remove-book" onclick="removeBook('${book.id}')">Remove</button>
            </div>
        `
        bookList.appendChild(bookItem)
    })
}