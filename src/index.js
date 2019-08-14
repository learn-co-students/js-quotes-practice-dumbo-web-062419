// ----->   Define Call Constants 

const GET_url = 'http://localhost:3000/quotes?_embed=likes';
const quotes_UL = document.getElementById('quote-list');
const quotes_Form = document.getElementById('new-quote-form');


// ---->  Get all quotes and render on page
fetch(GET_url) 
    .then(response => response.json()) //-----> Converting the Response to Json Format
    .then(list_Of_Quotes => {          //-----> Converted Data ready for Iteration
        list_Of_Quotes.forEach(quote => {   //----> Using forEach Loop 
            quotes_UL.innerHTML +=     // ------> APPENDING HTML
                `<li class='quote-card' data-id = ${quote.id}>
            <blockquote class="blockquote">
              <p class="mb-0">${quote.quote}</p>
              <footer class="blockquote-footer">${quote.author}</footer>
              <br>
              <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
              <button class='btn-danger'>Delete</button>
            </blockquote>
          </li>`
        })
    })


// --->    POST new quote via Quote Form Submission

quotes_Form.addEventListener('submit', event => {                       // --------> X Event
    event.preventDefault()
    let quoteText = document.getElementById('new-quote').value
    let author = document.getElementById('author').value

    fetch("http://localhost:3000/quotes", {                             // ------> Y FETCH
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quote: quoteText,
            author: author,
            likes: 0
        })
    })
        .then(response => response.json())
        .then(quote => {
            quotes_UL.innerHTML +=                                      // -------> Z DOM
                `<li class='quote-card' data-id = ${quote.id}>
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      </li>`
        })

})
//------> DELETE a Quote from List
quotes_UL.addEventListener('click', event => {
    if (event.target.className == "btn-danger" ) {
        let li_card = event.target.parentElement.parentElement;
        console.log(li_card)
        let id = li_card.dataset.id
        fetch(`http://localhost:3000/quotes/${id}`,{
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            li_card.remove()
        })

    }
})

// UPDATE a quote's likes   

quotes_UL.addEventListener('click', event => {
    if (event.target.className == "btn-success" ) {
        let li_card = event.target.parentElement.parentElement;
        let id = li_card.dataset.id

        let current_Likes = event.target.querySelector('span').innerHTML;
        let newLikes = parseInt(current_Likes) + 1;

        fetch('http://localhost:3000/likes',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                quoteId: parseInt(id)
            })
        })
        .then(response => response.json())
        .then(data => {event.target.querySelector('span').innerHTML = newLikes
    })

    }
       
})