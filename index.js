let grid = [0,0];
let runningTimers = [];
let savedTimers = [];

function loadGrid() {
  if (document.querySelector('.rows').value && document.querySelector('.columns').value) {
    grid = [
    document.querySelector('.rows').value,
    document.querySelector('.columns').value
    ]
    document.querySelector('.rows').value = '';
    document.querySelector('.columns').value = '';
  } else {
    alert('Incorrect row and/or column values.')
  }

  let gridHtml = '';
  for (let item=0; item<grid[0]*grid[1]; item++) {
    gridHtml += `
    <div class="entity entity${item}">
      <p class="timer timer${item}">00:00</p>
      <div class="buttons">
        <button class="entityButton startButton startButton${item}" onclick="startTimer(${item})">&#9658;</button> 
        <button class="entityButton stopButton stopButton${item}" onclick="stopTimer(${item})">&#x25FE;</button> 
        <button class="entityButton hideButton hideButton${item}" onclick="hideButton(${item})">&#10006;</button>
      </div>
    </div>
    `
  }
  document.querySelector('.entityWrapper').innerHTML = gridHtml;

  const children = document.querySelectorAll('.entityButton');
  const children2 = document.querySelectorAll('.timer');
  const gridContainer = document.querySelector('.entityWrapper');

  const columns = grid[1];
  const rows = grid[0];
  const width = 100/columns;
  const textSize = Math.min(400/Math.sqrt(columns*rows), 120);
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${width}%)`;
  
  children.forEach(function(child) {
    child.style.fontSize = `${textSize}%`;
  })
  children2.forEach(function(child) {
    child.style.fontSize = `${textSize}%`;
  })
  
}

function hideButton(item) {
  const element = document.querySelector(`.entity${item}`);
  element.classList.toggle('hidden');
}

function startTimer(item) {
  runningTimers.push(
    {name: `${item}`,
    time: 0}
  )
}

setInterval(timerFunction, 100)

function timerFunction() {
  runningTimers.forEach((element, index) => {
    let timerNumber = element.name;
    element.time ++;
    document.querySelector(`.timer${timerNumber}`).innerText = Math.floor(runningTimers[index].time/10);
  })
}

function stopTimer(item) {
  runningTimers.forEach((element, index) => {
    if (element.name == item) {
      savedTimers.push(element.time);
      runningTimers.splice(index, 1);
      document.querySelector(`.timer${element.name}`).innerText = '00:00';
    }
  })
  displayTimers();
}

function displayTimers() {
  let html = '';
  for (let i=0; i<savedTimers.length; i++) {
    html += `<li>${savedTimers[i]/10}s</li>`;
  }
  document.querySelector('.resultList').innerHTML = html;
  let sum = 0;
  savedTimers.forEach((time) => {sum += time;})
  const average = sum/savedTimers.length;

  html = `The average time is equal to ${average/10} seconds`
  document.querySelector('.average').innerHTML = html;
}