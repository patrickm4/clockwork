// window.moment = require ('node_modules/moment/moment.js')
const moment = require('moment');
var start = document.getElementById('start');
var end = document.getElementById('end');
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

start.addEventListener('click', () =>{
  var curTime = postTime('start')
  // console.log("yeeet", curTime)
  localStorage.setItem('currentTime', curTime);
});

end.addEventListener('click', () =>{
  // TODO make sure there is a start time, maybe disable end or start
  var curTime = postTime('end')
  var startTime = localStorage.getItem('currentTime')
  const duration = moment.duration(moment(curTime).diff(moment(startTime)))
  var newDiv = document.createElement('div')

  newDiv.innerHTML = `Duration: ${duration.asHours().toFixed(2)} hrs`

  list.append(newDiv)

  // console.log("yaaw", duration._data.hours, duration._data, duration.asHours() )
  // console.log("yaaw2", startTime, curTime)
});

selectCopy.addEventListener('click', () => {
  console.log("copy", list, list.textContent)
  // list.forEach(t => {
  //   console.log(t)
  // })
  // for(var t in list){
  //   console.log(t.innerText())
  // }

  // list.textContent.writeText()
  // list.innerText().select()
  // document.execCommand("copy");
  // console.log(list.innerText()

  navigator.clipboard.writeText(list.textContent)
    .then(() => {
      console.log("success")
    })
    .catch(err => console.log("fail", err))

})



clear.addEventListener('click', () => {
  // TODO Confirmation to reset
  list.innerHTML = "";
  localStorage.clear();
});

var timeInterval = window.setInterval(getTime, 1000);

function getTime() {
  const curDate = new Date()
  document.getElementById('clock').innerHTML = moment(curDate).format('LT');

  document.getElementById('date').innerHTML = moment(curDate).format('MMM ddd Do YYYY');
}

window.onload = () => {
  getTime();
}
