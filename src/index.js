// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", function(){

    const ul = document.getElementById('quote-list')
    const newQuoteForm = document.getElementById('new-quote-form')

    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(listQuotes)

    function listQuotes (quoteData){
        quoteData.forEach(addQuote)
    }

    function addQuote(quote){
            const quoteLi = document.createElement('li');
            quoteLi.className = "quote-card"
            quoteLi.innerHTML = `
            <blockquote data-id="${quote.id}" class="blockquote">
                <p class="mb-${quote.id}">${quote.quote}</p>
                <footer class="blockquote-footer">${quote.author}</footer>
                <br>
                <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
                <button class='btn-danger'>Delete</button>
            </blockquote>
            `
            ul.append(quoteLi)
            // console.log(quote)
    }

    newQuoteForm.addEventListener('submit', function(){
        event.preventDefault();
        const newQuoteValue = document.getElementById('new-quote').value;
        const newAuthorValue = document.getElementById('author').value;
        
        fetch('http://localhost:3000/quotes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                quote: newQuoteValue,
                author: newAuthorValue,
                likes: []
            })
        }).then(res => res.json())
        .then(addQuote)

    })

    ul.addEventListener('click', function(event) {
        // console.log(event)
        if(event.target.classList.contains('btn-danger')){
            const postId = event.target.parentElement.dataset.id

            fetch(`http://localhost:3000/quotes/${postId}`, {
                method: "DELETE"
            }).then(res => res.json())
            .then(event.target.parentElement.parentElement.remove())
            
        }
        else if(event.target.classList.contains('btn-success')){
            likes = event.target.querySelector('span')
            const postId = event.target.parentElement.dataset.id
            fetch(`http://localhost:3000/likes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    quoteId: parseInt(postId)
                })
            }).then(res => res.json())
            .then(function(){
                likes.innerText = parseInt(likes.innerText) + 1
            })
        }
    })




})