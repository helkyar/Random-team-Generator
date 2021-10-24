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





//Add event to the "Add" button, when it gets pressed, it wont refresh the page, 
//but instead will add 1 to the counter variable.
addButton.addEventListener('click',function(e){
e.preventDefault();
if(nameValue.value != ""){
    counter+=1;
}
//  ESTO HAY QUE AVERIGUAR COMO: 
//let texto = members.textContent
//  texto[8] = "counter";
// members.innerHTML = texto
nameValue.value = "";


console.log(counter)
});



