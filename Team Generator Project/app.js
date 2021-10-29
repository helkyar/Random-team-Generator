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

let teamSize = document.querySelector("#size");

let nameInput = document.querySelector("#name");

let members = document.querySelector(".inf-memb");

let memberList = document.querySelector(".participants");

let team = document.querySelector(".team");

let infTeams = document.querySelector(".inf-teams");
 
let memberInit = [memberList.innerHTML];  

let teamInitial = team.innerHTML;

//Create a "p" tag with the content of the "Name" input text and add it to the list of members.


//Add event to the "Add" button, when it gets pressed, it wont refresh the page,
//but instead will add 1 to the counter variable.
addButton.addEventListener("click", function (e) {
  //This function will prevent running any default event like reset or refresh the page
  e.preventDefault();
  function createMember() {    
    memberInit.push(`<p class="member">${nameInput.value}</p>`);
    nameInput.value = "";
    memberList.innerHTML = memberInit.join("");   
    members.innerText = `Memb.: ${memberInit.length-1}`;
  }
  if (nameInput.value != "") {    
    //Insert the value of "Name" text input into a new created paragraph tag, wich is a child
    //of section wich class is "participants"
    createMember();
  }  
});

//ON CONSTRUCTION
teamSize.addEventListener("input", function(){   
  let size = 2;
  let teamDivs = [];  

  if(teamSize.value > 2){
    size = teamSize.value;
  }    
  let teamNum = Math.ceil((memberInit.length-1) / size);  
  infTeams.innerHTML = `Teams: ${teamNum}`;
  
    for(let i=0; i < teamNum; i++){                  
        teamDivs.push(`<div><h4>Team ${i+1}</h4></div>`);
      };   
              
  team.innerHTML = teamInitial + teamDivs.join("");  

})