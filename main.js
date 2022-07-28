//GLOBAL VARIABLE:
var ideas = []

//QUERY SELECTORS:
var saveButton = document.querySelector(".saveButton")
var userTitleInput = document.querySelector("#title-input")
var userBodyInput = document.querySelector("#body-input")
var ideaboxSection = document.querySelector(".ideabox-section")
var showStarredButton = document.querySelector(".showStarredButton")
var formContainer = document.querySelector(".form-container")
var searchBar = document.querySelector("#search-ideas");

//EVENT LISTENERS

saveButton.addEventListener('click', addIdea)
formContainer.addEventListener('input', saveButtonDisplay)
// saveButton.addEventListener('click', clearInput);
ideaboxSection.addEventListener('click', deleteCard)
ideaboxSection.addEventListener('click', favoriteCard)

// currently working on:
showStarredButton.addEventListener('click', displayFavorites)
searchBar.addEventListener('keyup', function(event) {
  var userSearch = searchBar.value.toLowerCase();
  var currentIdeas = Array.from(document.querySelectorAll(".ideabox-body"));
  console.log(currentIdeas);
  for (var i = 0; i < currentIdeas.length; i++) {
    var innerText = currentIdeas[i].innerText.toLowerCase();
    // console.log(innerText);
    if (innerText.indexOf(userSearch) === -1) {
      console.log("This does not match, no");
      console.log()
      // then, add a hidden class to the closest container div
    }
  }
});

/*
currentIdeas[0].children[1].innerText =
title and body

can also add toLowerCase() method to the
end and it's okay
*/

//EVENT HANDLERS

function addIdea() {
  var newIdea = new Idea(userTitleInput.value, userBodyInput.value);
  ideas.push(newIdea);

  ideaboxSection.innerHTML += `
    <div class="ideabox-container" id="${ideas[ideas.length -1 ].id}">
      <div class="ideabox-header">
        <div class="ideabox-header-image"><img class="star-btn" src="assets/star.svg" alt="star to favorite"></div>
        <div class="ideabox-header-image"><img class="delete-btn" src="assets/delete.svg" alt="x to delete"></div>
      </div>
      <div class="ideabox-body">
        <h3>${ideas[ideas.length - 1].title}</h3>
        <p class="ideabox-body-text">${ideas[ideas.length - 1].body}</p>
      </div>
      <div class="ideabox-footer">
        <div class="ideabox-footer-image"><img src="assets/comment.svg"></div>
        <div class="ideabox-comment"><p>Comment</p></div>
      </div>
    </div>
    `
  saveButton.disabled = true;
  if (userTitleInput.value.length > 0 && userBodyInput.value.length > 0) {
    userTitleInput.value = '';
    userBodyInput.value = '';
  }
}

function saveButtonDisplay() {
  if (userTitleInput.value.length > 0 && userBodyInput.value.length > 0) {
    saveButton.disabled = false;
  }
  else {
    saveButton.disabled = true;
  }
}

// function clearInput() {
//   saveButton.disabled = true;
//   if (userTitleInput.value.length > 0 && userBodyInput.value.length > 0) {
//     userTitleInput.value = '';
//     userBodyInput.value = '';
//   }
// }

function deleteCard() {
  if (event.target.classList.contains("delete-btn")) {
    for (var i = 0; i < ideas.length; i++) {
      var id = parseInt(event.target.closest(".ideabox-container").id)
      if (id === (ideas[i].id)) {
        ideas.splice(i, 1)
        }
      event.target.closest(".ideabox-container").remove()
      }
    }
  }

function favoriteCard() {
  if (event.target.classList.contains("star-btn")) {
    if (event.target.getAttribute('src') === "assets/star.svg") {
      event.target.src = "assets/star-active.svg";
    }
    else if (event.target.getAttribute('src') === "assets/star-active.svg") {
      event.target.src = "assets/star.svg";
    }
    var id = parseInt(event.target.closest(".ideabox-container").id);
      for (var i = 0; i < ideas.length; i++) {
        if (id === (ideas[i].id)) {
          ideas[i].updateIdea();
          // console.log(ideas[i].star)
        }
      }
  }
}

// currently working on:

function displayFavorites() {
  console.log('showed star clicked');
  // ideaboxSection.innerHTML = ``;

  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star === false) {
      console.log(ideas[i]);
      // then remove those elements from view;
      // event.target.closest(".ideabox-container").remove()
    }
  }

  if (event.target.innerHTML === 'Show Starred Ideas') {
    event.target.innerHTML = 'Show All Ideas';
  }
  else if(event.target.innerHTML === 'Show All Ideas') {
    event.target.innerHTML = 'Show Starred Ideas';
  }
}
