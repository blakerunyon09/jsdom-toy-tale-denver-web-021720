const toysAPI = 'http://localhost:3000/toys/'
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch(toysAPI)
    .then(handleResponse)
    .then(toys => {
      toys.forEach( toy => {
        createCard(toy)
      })
    })
})

const handleResponse = (response) => {
  return response.json()
}

const createCard = (toy) => {
  const toyContainer = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  div.classList.add('card')

  cardBody(toy, div)

  toyContainer.append(div)
}

const cardBody = (toy, div) => {
  const h2 = document.createElement('h2')
  h2.textContent = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')

  const p = document.createElement('p')
  p.textContent = toy.likes

  const btn = document.createElement('button')
  btn.id = `toyid_${toy.id}`
  btn.textContent = "Like"
  btn.classList.add('like-btn')
  btn.addEventListener('click', addLike)

  div.append(h2, img, p, btn)
}

const addNewToyBtn = document.querySelector('input[type=submit]')
addNewToyBtn.addEventListener('click', (e) => {
  const form = document.querySelector('form')
  e.preventDefault()

  const formData = new FormData(form)
  const toyName = formData.get('name')
  const toyImage = formData.get('image')

  toyOptions = {
    name: toyName,
    image: toyImage,
    likes: 0
  }

  options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyOptions)
  }
  
  fetch(toysAPI, options)
    .then(handleResponse)
    .then(createCard)
})

const addLike = (e) => {
  const toyid = e.target.id.slice(-1)
  let toyLikes = e.target.parentNode.querySelector('p')
  let count = +toyLikes.textContent + 1

  options ={
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: count
    })
  }
  
  fetch(toysAPI + toyid, options)
    .then(handleResponse)
    .then(toyLikes.textContent = count)
}

