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
  .then((json) => {
  json.forEach(renderToy)


  });

  const renderToy = (toy) => {
    let toyDiv = document.createElement('div')
    let toyName = document.createElement('h2')
    let toyImage = document.createElement('img')
    let toyLikes = document.createElement('p')
    let likeButton = document.createElement('button')

    toyDiv.className = 'card'
    toyDiv.dataset.id = toy.id
    toyDiv.dataset.likes = toy.likes
    toyImage.className = 'toy-avatar'
    likeButton.className = 'like-btn'


    toyImage.src = toy.image
    toyName.innerText = toy.name
    toyLikes.innerText = toy.likes
    likeButton.innerText = "Like"

    toyDiv.append(toyName, toyImage, toyLikes, likeButton)
    list.appendChild(toyDiv)

    likeButton.addEventListener('click', () => {
        const toyId = event.target.parentNode.dataset.id
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "PATCH",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({likes: parseInt(event.target.parentNode.dataset.likes) + 1})
        }).then(res => {return res.json()}).then((json) => {toyLikes.innerText=json.likes; toyLikes.parentNode.dataset.likes = json.likes})
        });
  }

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
  // function editToy(event){
  // // console.log("hit");
  // // // event.preventDefault()
  // const toyId = event.target.parentNode.dataset.id
  // console.log(event)
  // fetch(`http://localhost:3000/toys/${toyId}`, {
  //   method: "PATCH",
  //   headers: {"Content-type": "application/json"},
  //   body: JSON.stringify({priority: event.target.value})
  // })
  // // // .then(res => res.json())
  // // // .then(json => console.log(json))
  // }




  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newToyName = document.getElementsByClassName('input-text')[0]
    const newToyImage = document.getElementsByClassName('input-text')[1]
    const newToyLikes = "0"
    fetch("http://localhost:3000/toys",{
       method: "POST",
       headers: {"Content-type": "application/json"},
       body: JSON.stringify({name: newToyName.value,
         image: newToyImage.value,
         likes: 0
       })
     })
     .then(res => res.json())
     .then((toy) => {
       renderToy(toy)
       newToyName.value = ""
       newToyImage.value = ""
     })
   })
})


// OR HERE!
