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
        const cell = document.createElement("td");
        
        if (key === "id") continue; // Skip ID if you don’t want to show it
        
        if (key === "isRead") {
        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = book.isRead;

        checkbox.addEventListener("change", () => {
            book.isRead = checkbox.checked;
            console.log(book);
        });

        cell.appendChild(checkbox);

        } else {
            cell.textContent = book[key];
        }

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

    console.log("book form:", newBookForm);
    for (const [key, value] of formData.entries()) {
        if (key === "isRead") {
            book[key] = value === "on";
        } else {
            book[key] = value;
        }
    }
    
    console.log(book);
    addBookToLibrary(book["title"], book["author"], book["year"], book["genre"], book["isRead"]);
    dialog.close();

    cleanForm(formData);    
    
    displayBooks();
})

cancBtn.addEventListener("click", () => {
    const formData = new FormData(newBookForm);
    
    cleanForm(formData);
        
    dialog.close();
})

function cleanForm(formData) {
    for (const [key, _] of formData.entries()) {
        if (key!="isRead") {
            document.querySelector(`input[name = "${key}"]`).value = "";
        } else {
            document.querySelector(`input[name = "isRead"]`).checked = false;
        }
    }
}
