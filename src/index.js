// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener("DOMContentLoaded", function() {
  const ul = document.getElementById("quote-list")
  const form = document.getElementById("new-quote-form")

  fetch("http://localhost:3000/quotes?_embed=likes")
  .then(res => res.json())
  .then(listQuotes)

  form.addEventListener("submit", function(event) {
    event.preventDefault()
    const newQuote = document.getElementById("new-quote").value
    const author = document.getElementById("author").value
    // console.log(newQuote)
    // console.log(author)
    fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        quote: newQuote,
        author: author,
        likes: []
      })
    }).then(res => res.json())
      .then(addQuote)
  })

  function listQuotes(quoteData) {
    quoteData.forEach(addQuote)
  }

  function addQuote(quote) {
    // console.log(quote)
    const quoteLi = document.createElement("li")

    quoteLi.className = "quote-card"
    quoteLi.innerHTML = `
    <blockquote class="blockquote" data-id="${quote.id}">
      <p class="mb-${quote.id}">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
    `
    ul.append(quoteLi)
  }

  ul.addEventListener("click", function() {
    if (event.target.classList.contains("btn-danger")) {
      const postId = event.target.parentElement.dataset.id
      fetch(`http://localhost:3000/quotes/${postId}`, {
        method: "DELETE"
      }).then(res => res.json())
        .then(event.target.parentElement.parentElement.remove())
    }
    else if (event.target.classList.contains("btn-success")) {
      const likes = event.target.querySelector("span")
      const postId = event.target.parentElement.dataset.id

      fetch("http:localhost:3000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          quoteId: parseInt(postId)
        })
      }).then(res => res.json())
        .then(function() {
          likes.innerText = parseInt(likes.innerText) + 1
        })
    }
  })

})
