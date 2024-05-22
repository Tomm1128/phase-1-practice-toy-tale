let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toySection = document.getElementById("toy-collection")
  const addToyForm = document.querySelector("form.add-toy-form")
  let toyCollection

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

  const createToyCard = (resp) => {
    toyCollection = resp
    toyCollection.forEach((toy) => {
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
      div.appendChild(h2)
      div.appendChild(imgTag)
      div.appendChild(p)
      div.appendChild(btnTag)
      toySection.appendChild(div)
    })
  }

  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let toyName = event.target[0].value
    let imgUrl = event.target[1].value
    let toyId = (toyCollection.length + 1).toString()
    
    
    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id: toyId,
        name: toyName,
        image: imgUrl,
        likes: 0
      })
    })
    .then(() => {
      window.location.reload();
  })
  })

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(resp => createToyCard(resp))


});
