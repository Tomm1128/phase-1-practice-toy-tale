let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toySection = document.getElementById("toy-collection")
  const addToyForm = document.querySelector("form.add-toy-form")
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  let toyCollection
  let likeButtonArray = []

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
    const btnTag = document.createElement("button")

    div.className = "card"
    imgTag.className = "toy-avatar"
    btnTag.className = "like-btn"

    h2.textContent = toy.name
    imgTag.src = toy.image
    p.textContent = `${toy.likes} Likes`
    btnTag.id = toy.id
    btnTag.textContent = "Like ❤️"

    likeButtonArray.push(btnTag)

    div.appendChild(h2)
    div.appendChild(imgTag)
    div.appendChild(p)
    div.appendChild(btnTag)
    toySection.appendChild(div)

    likeButtonArray.forEach((btn) => {
      btn.addEventListener("click", event => updateLikeCount(event))
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
