// Formulario que acepta nombres
// Genera equipos de forma aleatoria
// Número de personas por equipos
// elimar personas
// -> del equipo
// -> de la lista inicial
// ?->Arrastar para cambiar de equipos

//Delete text from inputs
var counter = 0;

let addButton = document.querySelector(".add");

let nameValue = document.querySelector("#name");

let members = document.querySelector(".inf-memb");

let memberList = document.querySelector(".participants");

//Add event to the "Add" button, when it gets pressed, it wont refresh the page, 
//but instead will add 1 to the counter variable.
addButton.addEventListener('click',function(e){
//This function will prevent running any default event like reset or refresh the page
e.preventDefault();
//I need a counter to do some operation, so everytime the EventListener is launched, if the
//text of my input text "Name" is not empty ("") then counter increase in 1.
if(nameValue.value != ""){
    counter+=1;
}
//Insert the value of "Name" text input into a new created paragraph tag, wich is a child
//of section wich class is "participants"
let participantsMember = document.createElement("p")
participantsMember.innerHTML = nameValue.value;
memberList.appendChild(participantsMember);

//We want to change the Memb number from the html wich is always 0, to the actual
//members number every time We insert a newone, so We store the text of that tag wich class is inf-teams
//into an Array, then itt Will take the last position of the Array wich in the beginning was "0" and
//will equals it to the counter value. 
//Then it convert the Array again to a String and giving the new values to the textContent.
//At the end, it will clear the "Name" text input.
let textArray = members.textContent.split(" ");
textArray[textArray.length-1] = counter;
members.textContent = textArray.join(" ");
nameValue.value = "";







});



