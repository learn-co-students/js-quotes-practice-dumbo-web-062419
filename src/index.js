// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(res => res.json())
    .then(data => renderQuotes(data))
})

const formTag = document.getElementById("new-quote-form")

formTag.addEventListener("submit", function(event) {
    event.preventDefault()
    const newQuote = document.getElementById("new-quote")

    const newAuthor= document.getElementById("author")



    console.log(newQuote.value)
    console.log(newAuthor.value)
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        quote: newQuote.value ,
        author: newAuthor.value ,
        likes: []
        })
    }).then(response => response.json()).then(data => createQuote(data))

})



function renderQuotes(data){
    const quotesUl = document.getElementById("quote-list")
    data.forEach(createQuote)
}

function createQuote(data){

    const quotesUl = document.getElementById("quote-list")

    quotesUl.innerHTML += `<li data-id = ${data.id} class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${data.quote}</p>
      <footer class="blockquote-footer">${data.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span id="span-${data.id}">${data.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>`

const deleteButton = quotesUl.querySelector(".btn-danger")
const likeButton = quotesUl.querySelector(".btn-success");


quotesUl.addEventListener("click", deleteQuote)
quotesUl.addEventListener("click", increaseLikes)

}

function deleteQuote (event){
    const quoteId = event.target.parentElement.parentElement.dataset.id
    
    if (event.target.classList.contains('btn-danger')) {
        event.target.parentElement.parentElement.remove()

        fetch(`const quoteId = event.target.parentElement.parentElement`, {
            method: "DELETE"
        })
    }
}

function increaseLikes(event){

    const quoteIdd = event.target.parentElement.parentElement.dataset.id;
    console.log(quoteIdd)
    
    if(event.target.classList.contains('btn-success')){
        
        fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quoteId: parseInt(quoteIdd)
            })
        }).then(res => res.json())
        .then(function(data){
            const likedBtn = document.querySelector(`#span-${quoteIdd}`)
            let likes = parseInt(likedBtn.innerText)
            likes += 1
            likedBtn.innerText = likes
            console.log(likedBtn)
            

        })
    }
}