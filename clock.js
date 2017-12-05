


// criar um objeto pra guardar as funcoes e estados


let timeAvailable = 1500;
let running = false
let count;

function show() {
  let minutos = Math.floor( timeAvailable/60);
  let minutosD= Math.floor( minutos/10);
  let minutosU = minutos % 10
  let segundos = timeAvailable % 60
  let segundosD = Math.floor( segundos/10);
  let segundosU = segundos % 10

  document.getElementById("display-m").innerHTML = minutosD + "" + minutosU;
  document.getElementById("display-s").innerHTML = segundosD + "" + segundosU;


}

function check() {

  if (timeAvailable === 0) { stopCount(); new Audio('bell.wav').play();
    document.getElementById("start-stop").setAttribute("onclick", "");
    document.getElementById("start-stop").setAttribute("class", "off");
    var myNotification = new Notification('Tempo', {
    body: 'O Tempo Acabou!'
  })
}


}

// START
function startCount() {
  document.getElementById("start-stop").setAttribute("onclick", "stopCount()");
  document.getElementById("start-stop").setAttribute("class", "stop");
  document.getElementById("start-stop").innerHTML = "Parar";
  count = window.setInterval( function() {  timeAvailable -= 1; check(); console.log(timeAvailable); show() }, 1000 );

}
//STOP
function stopCount() {
  document.getElementById("start-stop").setAttribute("onclick", "startCount()");
  document.getElementById("start-stop").setAttribute("class", "start");
  document.getElementById("start-stop").innerHTML = "Iniciar";
  clearInterval(count)


};

function reset() {
  document.getElementById("start-stop").setAttribute("onclick", "startCount()");
  document.getElementById("start-stop").setAttribute("class", "start");
  timeAvailable = 1500;
  stopCount();
  show();

}
