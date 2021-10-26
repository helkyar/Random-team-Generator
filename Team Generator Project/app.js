// Formulario que acepta nombres
// Genera equipos de forma aleatoria
// Número de personas por equipos
// elimar personas
// -> del equipo
// -> de la lista inicial
// ?->Arrastar para cambiar de equipos

//Delete text from inputs
let counter = 0;

let addButton = document.querySelector(".add");

let teamSizer = document.querySelector("#size");

let nameValue = document.querySelector("#name");

let members = document.querySelector(".inf-memb");

let memberList = document.querySelector(".participants");

let team = document.querySelector(".team");

let memberInit = memberList.innerHTML;

const teamInitial = team.innerHTML;
//Add event to the "Add" button, when it gets pressed, it wont refresh the page,
//but instead will add 1 to the counter variable.
addButton.addEventListener("click", function (e) {
  //This function will prevent running any default event like reset or refresh the page
  e.preventDefault();

  if (nameValue.value != "") {    
    //Insert the value of "Name" text input into a new created paragraph tag, wich is a child
    //of section wich class is "participants"
    createMember();
  }
});


//Create a "p" tag with the content of the "Name" input text and add it to the list of members.

function createMember() {  
  memberInit += `<p class="member">${nameValue.value}</p>`;
  memberList.innerHTML = memberInit;
  let membSize = document.querySelectorAll(".member");
  members.innerText = `Memb.: ${membSize.length}`;
}



//ON CONSTRUCTION
teamSizer.addEventListener("input", function(){  
  
  team.innerHTML = teamInitial;
  for(let i=0; i < teamSizer.value; i++){                  
      team.appendChild(document.createElement("div"));        
  };    

})