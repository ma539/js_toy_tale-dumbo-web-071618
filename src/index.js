const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", () => {
  let list = document.querySelector('#toy-collection')
  fetch("http://localhost:3000/toys")
  .then(res => {
    return res.json()
  })
  .then(json => {
    json.forEach((toy) => {
      let toyDiv = document.createElement('div')
      let toyName = document.createElement('h2')
      let toyImage = document.createElement('img')
      let toyLikes = document.createElement('p')
      let likeButton = document.createElement('button')

      toyDiv.className = 'card'
      toyImage.className = 'toy-avatar'
      likeButton.className = 'like-btn'

      toyImage.src = toy.image
      toyName.innerText = toy.name
      toyLikes.innerText = toy.likes

      toyDiv.append(toyName, toyImage, toyLikes, likeButton)
      list.appendChild(toyDiv)
    })
  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const newToyName = document.getElementbyId('name')
  const newToyImage = document.getElementbyId('image')
  fetch("http://localhost:3000/toys",{
     method: "POST",
     headers: {"Content-type": "application/json"},
     body: JSON.stringify({name: newToyName.value,
       image: newToyImage.value,
     })
   })
   .then(res => res.json())
   .then((toy) => {
     renderToy(toy)
     newToyName.value = ""
     newToyImage.value = ""
   })
})
// OR HERE!
