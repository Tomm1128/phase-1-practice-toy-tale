let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toySection = document.getElementById("toy-collection")

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

  const createToyCard = (collection) => {

    collection.forEach((toy) => {
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

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyCollection => createToyCard(toyCollection))


});
