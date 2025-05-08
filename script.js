const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

//! Adding books to library
addBookToLibrary("Yash The Gamer", "Yash Tiwari", "725", true);
addBookToLibrary("Factory The Developer", "Yash Tiwari", "632", false);
addBookToLibrary("Bansi The Designer", "Yash Tiwari", "459", true);

const allBooks = document.querySelector(".all-books");

function showBooksToPage(title, author, pages, read, id) {
  let div = document.createElement("div");
  div.classList.add("book");
  div.setAttribute("id", id);

  let title1 = document.createElement("p");
  let author1 = document.createElement("p");
  let pages1 = document.createElement("p");
  let read1 = document.createElement("button");
  let remove1 = document.createElement("button");

  title1.textContent = title;
  author1.textContent = author;
  pages1.textContent = pages;
  if (read) {
    read1.textContent = "Read";
  } else {
    read1.textContent = "Not read";
  }
  remove1.textContent = "Remove";

  read1.setAttribute("type", "button");
  remove1.setAttribute("type", "button");
  read1.classList.add("btn", "read-btn");
  remove1.className = "btn remove-btn";

  if (read1.textContent == "Read") {
    read1.style.backgroundColor = "var(--light-green)";
  } else {
    read1.style.backgroundColor = "var(--light-red)";
  }
  read1.addEventListener("click", () => {
    if (read1.textContent == "Read") {
      read1.textContent = "Not read";
      read1.style.backgroundColor = "var(--light-red)";
    } else {
      read1.textContent = "Read";
      read1.style.backgroundColor = "var(--light-green)";
    }
  });

  remove1.addEventListener("click", () => {
    handleRemoveBtn(remove1);
  });

  div.appendChild(title1);
  div.appendChild(author1);
  div.appendChild(pages1);
  div.appendChild(read1);
  div.appendChild(remove1);

  allBooks.appendChild(div);
}

for (let book of myLibrary) {
  showBooksToPage(book.title, book.author, book.pages, book.read, book.id);
}

const addBtn = document.querySelector(".add-btn");
const overlay = document.querySelector(".overlay");
const dialog = document.querySelector(".dialog");

//* Adding overlay and showing dialog box
addBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  dialog.classList.remove("hidden");
});

//* Removing overlay and removing dialog box
document.body.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("btn-add-new-book") ||
    e.target.classList.contains("overlay")
  ) {
    overlay.classList.add("hidden");
    dialog.classList.add("hidden");
  }
});

//* Changing read and not read
const readBtns = document.querySelectorAll(".read-btn");

readBtns.forEach((readBtn) => {
  if (readBtn.textContent == "Read") {
    readBtn.style.backgroundColor = "var(--light-green)";
  } else {
    readBtn.style.backgroundColor = "var(--light-red)";
  }
  readBtn.addEventListener("click", () => {
    if (readBtn.textContent == "Read") {
      readBtn.textContent = "Not read";
      readBtn.style.backgroundColor = "var(--light-red)";
    } else {
      readBtn.textContent = "Read";
      readBtn.style.backgroundColor = "var(--light-green)";
    }
  });
});

//! Adding boxes from dialog

const addNewBook = document.querySelector(".btn-add-new-book");
function addNewBookToLibrary() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");
  let check = read.checked ? true : false;

  if (title.value == "" || author.value == "" || pages.value == "") {
    alert(
      "None of filed should be empty. \nPlease fill out the remaining field"
    );
    return;
  }

  addBookToLibrary(title.value, author.value, pages.value, check);
  showBooksToPage(
    title.value,
    author.value,
    pages.value,
    check,
    myLibrary.at(-1).id
  ); //? last newly added book id = myLibrary.at(-1).id

  title.value = "";
  author.value = "";
  pages.value = "";
}
addNewBook.addEventListener("click", addNewBookToLibrary);

//! Removing Books from page
const removeBtn = document.querySelectorAll(".remove-btn");
function handleRemoveBtn(btn) {
  const parentElement = btn.parentElement;
  parentElement.remove();

  myLibrary.forEach((book) => {
    if (book.id == parentElement.id) {
      const bookIndex = myLibrary.indexOf(book);
      myLibrary.splice(bookIndex, 1);
    }
  });
}

removeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleRemoveBtn(btn);
  });
});
