let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toySection = document.getElementById("toy-collection")
  const addToyForm = document.querySelector("form.add-toy-form")
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  let toyCollection
  let likeButtonArray = []
  let deleteButtonArray = []

  const deleteToy = (event) => {
    let toyCard = event.target.parentElement 
    let toyId = event.target.id 

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "Delete",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      toyCard.remove()
    })
    .catch(error => {
      console.error('Error deleting resource:', error)
    })
  }

  const updateLikeCount = (event) => {
    let clickedToyId = event.target.id
    const lookUpUrl = `http://localhost:3000/toys/${clickedToyId}`
    const likesSection = event.target.parentElement.querySelector("p")
    const likeSectionText = likesSection.textContent 
    let countOfLikes = likeSectionText.split(" ")[0]
    countOfLikes ++

    const newLikeCount = `${countOfLikes} Likes`
    
    fetch(lookUpUrl, {
      method: "PATCH", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        likes: countOfLikes
      })
    })
    .then(() => {
      likesSection.textContent = newLikeCount
    })
  }

  const createToyCard = (toy) => {
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const imgTag = document.createElement("img")
    const p = document.createElement("p")
    const likeBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")

    div.className = "card"
    imgTag.className = "toy-avatar"
    likeBtn.className = "like-btn"
    deleteBtn.className - "delete-btn"

    h2.textContent = toy.name
    imgTag.src = toy.image
    p.textContent = `${toy.likes} Likes`
    likeBtn.id = toy.id
    likeBtn.textContent = "Like ❤️"
    deleteBtn.id = toy.id
    deleteBtn.textContent = "Delete"

    likeButtonArray.push(likeBtn)
    deleteButtonArray.push(deleteBtn)

    div.appendChild(h2)
    div.appendChild(imgTag)
    div.appendChild(p)
    div.appendChild(likeBtn)
    div.appendChild(deleteBtn)
    toySection.appendChild(div)

    likeButtonArray.forEach((btn) => {
      btn.addEventListener("click", event => updateLikeCount(event))
    })

    deleteButtonArray.forEach((btn) => {
      btn.addEventListener("click", event => deleteToy(event))
    })
  }

  const handleToyCard = (resp) => {
    toyCollection = resp
    toyCollection.forEach(toy => createToyCard(toy))
  }

  const createToy = (event) => {
    event.preventDefault()
    let toyName = event.target[0].value
    let imgUrl = event.target[1].value
    let toyId = (toyCollection.length + 1).toString()
    let toy = {
      id: toyId,
      name: toyName,
      image: imgUrl,
      likes: 0
    }
    
    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(toy)
    })
    .then(() => {
      createToyCard(toy)
    })
  }

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  addToyForm.addEventListener("submit", event => createToy(event))

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(resp => handleToyCard(resp))
});
