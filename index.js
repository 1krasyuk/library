const addBtn = document.querySelector(".add-btn");
const container = document.querySelector(".library-container");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const cancelBtn = document.querySelector(".cancel-btn");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

let library = [];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

document.querySelector(".submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    renderBooks();

    form.reset(); // Очистка формы
    dialog.close();
  } else {
    alert("Заполните все поля");
  }
});

function renderBooks() {
  container.innerHTML = "";

  library.forEach((book) => {
    const card = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const toggleReadBtn = document.createElement("button");

    card.className = "book-card";
    card.innerHTML = `
    <img src="src/default.jpeg">
    <h3>${book.title}</h3>
    <p>Author: ${book.author} </p>
    <p>Pages: ${book.pages} </p>
    <p>Read: ${book.read ? "Yes" : "No"} </p>
    `;
    deleteBtn.textContent = "Remove book";
    deleteBtn.dataset.id = book.id;
    toggleReadBtn.textContent = book.read ? "Not read" : "Mark as read";
    toggleReadBtn.dataset.id = book.id;

    deleteBtn.addEventListener("click", () => {
      library = library.filter((b) => b.id !== book.id);
      renderBooks();
    });

    toggleReadBtn.addEventListener("click", () => {
      book.read = !book.read;
      renderBooks();
    });

    card.append(deleteBtn, toggleReadBtn);

    container.appendChild(card);
  });
}

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

renderBooks();
