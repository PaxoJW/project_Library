const newBtn = document.querySelector(".new-btn");
const dialog = document.querySelector(".new-book-dialog");
const addBtn = document.querySelector(".add-btn");
const cancBtn = document.querySelector(".cancel-btn");
const newBookForm = document.querySelector("form");

const myLibrary = [];

class Book {
    constructor(title, author, year, genre, isRead) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.isRead = isRead;
    }

    toggleRead() {
        this.isRead === true ? false : true;
    }
}

function displayBooks() {
  const tableBody = document.getElementById("book-table-body");
  console.log(tableBody);
  tableBody.innerHTML = ""; // Clear existing rows

  myLibrary.forEach(book => {
    const row = document.createElement("tr");
    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    dltBtn.className = "dlt-btn";

    row.dataset.id = book.id;
    
    // Only display specific keys (optional: skip 'id' if not needed)
    for (const key in book) {
      if (key === "id") continue; // Skip ID if you don’t want to show it

      const cell = document.createElement("td");
      
      const value = key === "isRead" ? (book[key] ? "Yes" : "No") : book[key];
      
      cell.textContent = value;
      row.appendChild(cell);
    }

    dltBtn.addEventListener("click", () => {
        const bookID = row.dataset.id;
        const targetBookID = myLibrary.findIndex(b => b.id === bookID);
        
        if (targetBookID !== -1) {
            myLibrary.splice(targetBookID, 1);
            displayBooks();
        }
    })

    row.appendChild(dltBtn);
    tableBody.appendChild(row);
  });
}

function addBookToLibrary(title, author, year, genre, isRead) {
    const newBook = new Book(title, author, year, genre, isRead);
    console.log(newBook);
    myLibrary.push(newBook);
}

newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.show();
})

addBtn.addEventListener("click", () => {
    const formData = new FormData(newBookForm);
    const book = {};

    for (const [key, value] of formData.entries()) {
        book[key] = value;
        console.log("book[key]:", key, book[key]);
        console.log("value:", value);
    }
    
    console.log(book);
    addBookToLibrary(book["title"], book["author"], book["year"], book["genre"], book["isRead"]);
    dialog.close();

    for (const [key, _] of formData.entries()) {
        document.querySelector(`input[name = "${key}"]`).value = "";
    }

    displayBooks();
})

cancBtn.addEventListener("click", () => {
    const formData = new FormData(newBookForm);

    for (const [key, _] of formData.entries()) {
        document.querySelector(`input[name = "${key}"]`).value = "";
    }
    
    dialog.close();
})

