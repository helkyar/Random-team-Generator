// Formulario que acepta nombres
// Genera equipos de forma aleatoria
// Número de personas por equipos
// elimar personas
// -> del equipo
// -> de la lista inicial
// ?->Arrastar para cambiar de equipos

//Delete text from inputs

let participants = document.getElementsByClassName("participants");
let element = document.createElement("p");
element.innerText = "Josemi";
console.log(element);
console.log(participants);
participants[0].appendChild(element);
