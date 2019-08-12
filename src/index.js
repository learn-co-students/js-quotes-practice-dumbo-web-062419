// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.\

  // ---------------const -----------------
const URL =  "http://localhost:3000/quotes?_embed=like"
const quotesUl = document.getElementById("quote-list")
const formID = document.getElementById("new-quote-form")
const newQuoteURL = "http://localhost:3000/quotes"
// const deleteButton = document.querySelector(".btn-danger")
// console.log(deleteButton)


// ------------------ fetch-----------------


function fetchquotes(){  fetch(URL)
  .then(res => res.json())
  .then(quotesToDom)
}

  function createNewQuote(newQuote, newAuthor){
    fetch(newQuoteURL ,{
      method: 'POST',
      headers:{
        'Content-Type': "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({

        quote : newQuote,
        author: newAuthor
      })
    })
    .then(response => response.json())
    .then(newQuoteHTML)

  }





//------------slap it on the DOM---------


function quotesToDom(quotesArray){
  quotesArray.forEach(quote => {
    console.log(quote)
    let li = document.createElement("li")
    li.className = "quote-card"
    li.innerHTML = `
     <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button data-id=${quote.id} class='btn-danger'>Delete</button>

      </blockquote>`

      quotesUl.append(li)
  })
};

function newQuoteHTML(newContent) {
  let li = document.createElement("li")
  li.className = "quote-card"
  li.innerHTML = `
   <blockquote class="blockquote">
      <p class="mb-0">${newContent.quote}</p>
      <footer class="blockquote-footer">${newContent.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button data-id=${newContent.id} class='btn-danger'>Delete</button>
    </blockquote>`
    quotesUl.append(li)

}

function removeQuote(id){
  console.log(id)
}



//------------------ Event listener-----------------

document.addEventListener("DOMContentLoaded" , function () {

fetchquotes()

formID.addEventListener("submit" , function(event){
  event.preventDefault();
  let newQuote = document.getElementById("new-quote").value
  let newAuthor = document.getElementById("author").value
  createNewQuote(newQuote, newAuthor);
  event.target.reset()
})


// const deleteButton = document.querySelector(".btn-danger")
// console.log(deleteButton)

quotesUl.addEventListener("click", function(event){
  if (event.target.className === "btn-danger") {
    const id = event.target.dataset.id
    fetch(`http://localhost:3000/quotes/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => removeQuote(id)) //it's calling the function
  }
})
