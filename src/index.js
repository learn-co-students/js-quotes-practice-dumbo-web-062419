// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", function(){
  //DEFINING ALL CONSTANTS
  const getUrl = "http://localhost:3000/quotes?_embed=likes";
  const url = "http://localhost:3000/quotes";
  const quotesUl = document.querySelector('#quote-list');
  const quoteForm = document.querySelector('#new-quote-form');

  //GET ALL QUOTES AND SHOW ON THE PAGE
  //console.log(quotesUl)
  fetch(getUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(listOfQuotes){
      // console.log(listOfQuotes)
      listOfQuotes.forEach(function(quote){
        // console.log(quote)
        quotesUl.innerHTML += `<li class='quote-card' data-id=${quote.id}>
  <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
</li>`
      })
      // console.log(quotesUl)

    })//END OF SHOWING ALL QUOTES

    //POST NEW QUOTE FORM AFTER SUBMITTING IT
    quoteForm.addEventListener('submit', function(event){       //<----- event
      event.preventDefault()
      // console.log(event.target);
      let quote = event.target.querySelector('#new-quote').value
      let author = event.target.querySelector('#author').value
      fetch(url, {                                              //<-----fetch
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quote: quote,
          author: author,
          likes:0
        })
      }).then(function(response){
        return response.json();
      }).then(function(quote){
        // console.log(quote)                                 //<---Slap on the DOM
        quotesUl.innerHTML += `<li class='quote-card' data-id=${quote.id}>
  <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">S${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
</li>`
      })

      })// END OF QUOTE FORM

      //DELETE A QUOTE FROM THE QUOTE LIST
      quotesUl.addEventListener('click', function(event){
        let liCard = event.target.parentElement.parentElement;
        let id = liCard.dataset.id

        if (event.target.classList.contains('btn-danger')){
          // console.log("delete")
          // console.log(event.target)

          fetch(`http://localhost:3000/quotes/${id}`,{
            method: "DELETE"
          }).then(function(response){
            return response.json();
          }).then(function(quote){
            liCard.remove()
          })

        }

        //UPDATE A QUOTE'S LIKE AMOUNT
        if(event.target.classList.contains('btn-success')){
          let currentLikes= event.target.querySelector('span').innerHTML
          let newLikes = parseInt(currentLikes) + 1;
          fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              quoteId: parseInt(id)
            })
          })
          .then(function(response){
            return response.json();
          }).then(function(like){
            event.target.querySelector('span').innerHTML = newLikes;
          })
        }

      }) //END OF DELETING AND UPDATING LIKES











//END OF DOMCONTENTLOADED
})
