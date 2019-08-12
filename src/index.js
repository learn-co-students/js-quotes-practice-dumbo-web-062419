// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener("DOMContentLoaded", function(){

  const theForm = document.getElementById("new-quote-form")
  const stableUl = document.getElementById("quote-list")

// make fetch happen!
  fetch("http://localhost:3000/quotes?_embed=likes")
  .then(res => res.json())
  .then(allQuotes => renderAllQuotes(allQuotes))

function renderAllQuotes(quote){
  quote.forEach(renderQuote)
}

function renderQuote(quote) {
    stableUl.innerHTML += `
      <li class='quote-card' id="${quote.id}">
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
    `
  }

//create new quote
  theForm.addEventListener("submit", function(event){
    let quoteText = document.getElementById("new-quote").value
    let author = document.getElementById("author").value
    event.preventDefault();
    fetch("http://localhost:3000/quotes",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote: quoteText,
        author: author,
        likes: []
      })
    })
    .then(res => res.json())
    .then(quote => renderQuote(quote))
  })

//delete quote
stableUl.addEventListener("click", function(event) {
  if (event.target.classList.contains("btn-danger")){
    let quoteLi = event.target.parentElement.parentElement
    let qID = quoteLi.id
    fetch(`http://localhost:3000/quotes/${qID}`,{
      method: 'DELETE'
    })
    .then(res => {
      quoteLi.remove();
    })
  } else if (event.target.classList.contains("btn-success")){
    let quoteLi = event.target.parentElement.parentElement
    let qID = quoteLi.id
    fetch("http://localhost:3000/likes",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'quoteId': Number(qID)
      })
    })
    .then(res => res.json)
    .then(quote => quote)
    event.target.querySelector("span").innerText++
  }
})



  // end of DOMContentLoaded event listenter
})
