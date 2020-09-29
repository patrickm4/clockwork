const moment = require('moment');
var clear = document.getElementById('clear-list');
var list = document.getElementById('times');
var selectCopy = document.getElementById('select-copy');

const postTime = (type) => {
  const curDate = new Date();
  var newDiv = document.createElement('div')

  newDiv.innerHTML = `${type} ${moment(curDate).format('llll')}`;

  list.append(newDiv)

  return curDate
}

const toggleTime = (e) => {
  if (e === 'start') {
    start()
  } else if (e === 'stop') {
    stop()
  }
}

const start = () => {
  var curTime = postTime('start')
  localStorage.setItem('currentTime', curTime);

  document.getElementById('start').remove();
  createStopBtn();
};

const stop = () => {
  var curTime = postTime('end')
  var startTime = localStorage.getItem('currentTime')
  const duration = moment.duration(moment(curTime).diff(moment(startTime)))
  var newDiv = document.createElement('div')

  newDiv.innerHTML = `Duration: ${duration.asHours().toFixed(2)} hrs`

  list.append(newDiv)

  document.getElementById('stop').remove();
  createStartBtn();
};

selectCopy.addEventListener('click', () => {
  var reg = /<\/div><div>/g
  var startRegex = /<div>/
  var endRegex = /<\/div>/

  var parsedList = list.innerHTML.replace(reg, '\n').replace(startRegex, '').replace(endRegex, '')
  navigator.clipboard.writeText(parsedList)
    .then(() => {
      console.log("success")
    })
    .catch(err => console.log("fail", err))

})



clear.addEventListener('click', () => {
  // TODO prompt are you sure you want to clear?
  list.innerHTML = "";
  localStorage.clear();
});

function getTime() {
  const curDate = new Date()
  document.getElementById('clock').innerHTML = moment(curDate).format('LT');

  document.getElementById('date').innerHTML = moment(curDate).format('ddd MMM Do YYYY');
}

function createStartBtn() {
  var btn = document.createElement('button');

  btn.classList.add('button');
  btn.id = 'start'
  btn.addEventListener('click', () => {
    toggleTime('start');
  });
  btn.innerHTML = 'Start'

  document.getElementById('btn-group').appendChild(btn)
}

function createStopBtn() {
  var btn = document.createElement('button');

  btn.classList.add('button');
  btn.id = 'stop'
  btn.addEventListener('click', () => {
    toggleTime('stop');
  });
  btn.innerHTML = 'Stop'

  document.getElementById('btn-group').appendChild(btn)
}

var timeInterval = window.setInterval(getTime, 1000);

window.onload = () => {
  getTime();
  createStartBtn();
}
