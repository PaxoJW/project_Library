const newBtn = document.querySelector(".new-btn");
const myLibrary = [];

function Book(title, author, year, genre) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.author = author;
    this.year = year;
    this.genre = genre;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.open();
})
