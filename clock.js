


// criar um objeto pra guardar as funcoes e estados
let cronometerMode = false;
let running = false;
let afterTime = false;
let count;
let ring;


let mode = { "pomo": true, "break": false, "timePomo": 1500, "timeBreak":300}
mode.current = function() { if (this.pomo == true && cronometerMode == false) { return this.timePomo;

} else if (cronometerMode == true) {
    console.log(cronometerMode);
    return 0;
} else if (this.break == true) {
  return this.timeBreak;
}  else {
  return 0;
}
 }
console.log( mode.current());

let timeAvailable = mode.timePomo;


function show() {

  if (afterTime) {
    document.getElementById('display').className = "display after"

  } else {
    document.getElementById('display').className = "display"
  }


  let minutos = Math.floor( Math.abs(timeAvailable)/60);
  let minutosD= Math.floor( minutos/10);
  let minutosU = minutos % 10
  let segundos = Math.abs(timeAvailable) % 60
  let segundosD = Math.floor( segundos/10);
  let segundosU = segundos % 10

  document.getElementById("display-m").innerHTML = minutosD + "" + minutosU;
  document.getElementById("display-s").innerHTML = segundosD + "" + segundosU;


}

function bell(on) {

  if (on) {
      new Audio('bell.wav').play();
      ring = window.setInterval( function() {new Audio('bell.wav').play(); }, 10000)
  }

  if (on == false) {
    clearInterval(ring)
  }
}

function check() {

  if (timeAvailable === 0) { bell(true); afterTime = true;
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
  running = true;
  count = window.setInterval( function() {  timeAvailable -= 1; check(); console.log(timeAvailable); show() }, 1000 );

}

// Start count up
function startCountUp() {
  document.getElementById("start-stop").setAttribute("onclick", "stopCount()");
  document.getElementById("start-stop").setAttribute("class", "stop");
  document.getElementById("start-stop").innerHTML = "Parar";
  running = true;
  timeAvailable = 0;
  count = window.setInterval( function() {  timeAvailable += 1; console.log(timeAvailable); show() }, 1000 );

}
//STOP
function stopCount(stats= true) {

  document.getElementById("start-stop").setAttribute("class", "start deactivated");
  document.getElementById("start-stop").innerHTML = "Iniciar";
  running = false;

  clearInterval(count);
  bell(false);
  if (stats == true) {
    saveStats()
  }


};

function reset(stats= true) {
  stopCount(stats);
  document.getElementById("start-stop").className = "start"
  if (cronometerMode == true) {
      document.getElementById("start-stop").setAttribute("onclick", "startCountUp()");

  } else {  document.getElementById("start-stop").setAttribute("onclick", "startCount()"); }




    afterTime = false;

  if (cronometerMode == true) {
    timeAvailable = 0
  } else {
      timeAvailable = mode.current();
  }
  show();

}




function time() {
  button = document.getElementById('time');

  reset(false)

  if (mode.pomo) {
    timeAvailable = mode.timeBreak;
    mode.pomo = false;
    mode.break = true;
    button.innerHTML = "Pausa"
    document.getElementById('task').value = "break"




  } else if (mode.break) {
      timeAvailable = mode.timePomo;
      mode.pomo = true;
      mode.break = false;
      button.innerHTML = "Pomo";
      document.getElementById('task').value = document.getElementById('task').getAttribute("last")



    }
    show()
}


function cronometer() {
  if (running == false) {
    if (cronometerMode == true) {
        document.getElementById("cronometer").className = "off";
        cronometerMode = false;
        document.getElementById("start-stop").setAttribute("onclick", "startCount()");
        timeAvailable = mode.current();
        show()

    } else if (cronometerMode == false) {
        document.getElementById("cronometer").className = "";
        cronometerMode = true;
        document.getElementById("start-stop").setAttribute("onclick", "startCountUp()");
        timeAvailable = 0;

        show()
    }

  }

}

function saveStats() {
  let taskName = document.getElementById('task').value
  let timeMade

  if (cronometerMode == false && afterTime == true) {
      timeMade = mode.current() + Math.abs(timeAvailable)

  } else if (cronometerMode == false && afterTime == false) {
    timeMade = mode.current() - timeAvailable


  } else if (cronometerMode == true) {
      timeMade = timeAvailable

  }


  let minutos = Math.floor( Math.abs(timeMade)/60);
  let minutosD= Math.floor( minutos/10);
  let minutosU = minutos % 10
  let segundos = Math.abs(timeMade) % 60
  let segundosD = Math.floor( segundos/10);
  let segundosU = segundos % 10;
  let original = Math.floor( (mode.current()/60))
    if (taskName != "break") {
          document.getElementById('task').setAttribute("last",taskName)
    }

    document.getElementById('history').innerHTML += `<li>${taskName} - ${minutos}:${segundosD}${segundosU} (${original}M)  </li>`
}


function showHistory() {
  document.getElementById('relatory').setAttribute('style', '')
    console.log("batata");
}
function hideHistory() {
  document.getElementById('relatory').setAttribute('style', 'display:none')
  console.log("batata");
}
