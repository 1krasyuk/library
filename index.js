class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    this.renderBooks();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.renderBooks();
  }

  renderBooks() {
    const container = document.querySelector(".library-container");
    container.innerHTML = "";

    this.books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
    <img src="src/default.jpeg">
    <h3>${book.title}</h3>
    <p>Author: ${book.author} </p>
    <p>Pages: ${book.pages} </p>
    <p>Read: ${book.read ? "Yes" : "No"} </p>
    `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Remove book";
      deleteBtn.addEventListener("click", () => this.removeBook(book.id));

      const toggleReadBtn = document.createElement("button");
      toggleReadBtn.textContent = book.read ? "Not read" : "Mark as read";
      toggleReadBtn.addEventListener("click", () => {
        book.toggleRead();
        this.renderBooks();
      });

      card.append(deleteBtn, toggleReadBtn);

      container.appendChild(card);
    });
  }
}

const myLibrary = new Library();

myLibrary.addBook("1984", "George Orwell", 328, false);
myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, true);

document.querySelector(".add-btn").addEventListener("click", () => {
  document.querySelector("dialog").showModal();
});

document.querySelector(".cancel-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("dialog").close();
});

document.querySelector(".submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  if (title && author && pages) {
    myLibrary.addBook(title, author, pages, read);
    myLibrary.renderBooks();

    document.querySelector("form").reset();
    document.querySelector("dialog").close();
  } else {
    alert("Заполните все поля");
  }
});
