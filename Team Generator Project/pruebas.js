/* 
Este fichero es para ir probando cosas puntuales en Javascript.
Aqui estoy probando un programa que me coja nombres de un array,
le meto cuantas personas quiero por equipo "ppteam",
calculo cuantos equipos habría en total redondeando, es decir, si hay 10 personas y los equipos son de 3, me va a tomar que hay 3 equipos son
luego tengo que mirar como meter a la persona que sobra en el último equipo o algo así,
Para guardar las personas por equipos, Miguel me ha sugerido que las meta en un array multidimensional, con lo que me calcularía cuantos arrays 
van dentro del array teams, por ejemplo para equipos de 5 en un array de 10 irían 2 arrays dentro, y esto es equivalente a equipo 1 y 2, 
solo que sería algo como teams[0] y teams[1].
Finalmente, la unica forma que se me ocurre para rellenar el array y que cada vez que empieza la vuelta en el segundo bucle no empieze
de nuevo era añadiendo un contador. Esto de todas formas luego cambiará, porque queremos que se rellene de forma aleatoria y sin repetir nombres.
*/
let persons = ["Jose", "Javi", "Cristi", "Fernando", "Manoli", "Antonia", "Paco", "Curro", "Francis", "Miguel"];
let ppteam = 5;
let teams = [];
let nteams = Math.trunc(persons.length / ppteam);
let counter = 0;

for(i = 0; i < nteams; i++){
    teams.push([]);
}

for(i = 0; i < nteams; i++){
    
    for(j = 0; ppteam > j; j++){
        teams[i].push(persons[counter]);
        counter++;
    }
}

console.log(teams);






