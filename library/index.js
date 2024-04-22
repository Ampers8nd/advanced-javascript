const myLibrary = [];


// book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function() {
    let isReadStatement;
    if (isRead == true) {
      isReadStatement = "Read";
    } else {
      isReadStatement = "Reading";
    }
    statement = title + " by " + author + ", " + pages + " pages, " + isReadStatement

    return statement;
  }

}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");

// sample books
const theHobbit = new Book("The Hobbit", "Tolkien", "300", true);
addBookToLibrary(theHobbit);

const theExpanse = new Book("The Expanse", "James S.A Corey", "200", false);
addBookToLibrary(theExpanse);

function createRow(book) {
  // const table = document.querySelector(".table");

  // create elements
  const row = document.createElement("tr");
  const bookTitle = document.createElement("td");
  const bookAuthor = document.createElement("td");
  const bookPages = document.createElement("td");
  const bookStatus = document.createElement("td");

  // setting attributes
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  if (book.isRead == true) {
    bookStatus.textContent = "Read";
    // btnFinished.textContent = "Finished";
    // btnFinished.classList.add("button-finished");
  } else {
    bookStatus.textContent = "Reading";
    // btnFinished.textContent = "Reading";
    // btnFinished.classList.add("button-reading");
  }

  row.appendChild(bookTitle);
  row.appendChild(bookAuthor);
  row.appendChild(bookPages);
  row.appendChild(bookStatus);
  tableBody.appendChild(row);
}

// display books on table
function displayBooks(booksArray) {
  let index = 0; // index for row index , 0 is 1st row not in the header
  for (let book of booksArray) {  
    createRow(book);
    index++;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

displayBooks(myLibrary);

const addBookDialog = document.createElement("dialog");

// controls the addition of new books
const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", function() {
  const addBookFormPanel = document.createElement("div"); 
  const addForm = document.createElement("form");
  addForm.setAttribute("method", "dialog");
  addBookFormPanel.appendChild(addForm);
  // const tableBtn = document.getElementsByClassName("table-btn");

  const bookAttributes = ["title", "author", "pages", "reading"]; 

  for (let att of bookAttributes) { 

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container-div");
    // creating the label-input pair
    const label = document.createElement("label");
    label.setAttribute("for", att);
    label.textContent = capitalizeFirstLetter(att);
    const input = document.createElement("input");
    // setting attributes
    input.setAttribute("type", "text");
    input.setAttribute("id", att);
    input.setAttribute("name", att);
    containerDiv.appendChild(label);
    containerDiv.appendChild(input);

    addForm.appendChild(containerDiv);
  }

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add = "buttonDiv";

  const addBookBtn = document.createElement("button");
  addBookBtn.setAttribute("type", "submit");
  addBookBtn.textContent = "Add";
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";

  buttonDiv.appendChild(addBookBtn);
  buttonDiv.appendChild(cancelBtn);
  addBookFormPanel.appendChild(buttonDiv);
  addBookDialog.appendChild(addBookFormPanel);

  addBookDialog.showModal();

  // to-do: close the form when the user presses cancel
  // to-do: fix the bug where its not displaying the books correctly (multiple duplicates) when you press the add button on the form.

  document.body.appendChild(addBookFormPanel); 

  addBookBtn.addEventListener("click", (e) => {
    e.preventDefault(); // forms tend to submit to servers. This prevents that.
    
    console.log("submit button pressed");
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status");

    const newBook = new Book(title,author,pages,status);
    
    
    addBookToLibrary(newBook);
    createRow(newBook);
    addBookDialog.close();
    // we know why now.
    // it might just be simpler if I just deleted every row before displaying all the books
  });

  cancelBtn.addEventListener("click", () => {
    addBookDialog.close();
  })
})