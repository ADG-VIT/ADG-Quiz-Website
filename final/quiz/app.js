/*Designed and Developed by Apple Developers Group - VIT
https://github.com/ADG-VIT/ADG-Quiz-Website*/

// getting a bunch of DOM elements using querySelectors

const heading = document.querySelector(".heading");
const question = document.querySelector(".question");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const clock = document.querySelector(".clock");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const url = "https://task-3-api.herokuapp.com/questions";

//defining some variables and arrays that will help us keep
//track of question, options of various listed questions

const answers = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
const options = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
corOpt = ["A", "B", "C", "D"];

//this is sleep function designed to sync. stop the thread for 1 sec

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

//data will recieve the json data in it
//counter will represent the question number counter = 0 is first question

let data,
  counter = 0;

//this function will prompt fetch API to get data, axios can be used here too (more suitable)
//we get data from JSON and .json() is called on it to wait till we convert the data to js object
//refer how Fetch API and .json() works

async function getData() {
  const resp = await fetch(url);
  data = await resp.json();
}

getData();

//when update is called on a counter, the (counter+1)th question will be updated
//by updated we mean the selected option will be CHECKED and text related to the question will be displayed

function update(counter) {
  let obj = data[counter];
  heading.innerHTML = heading.innerHTML = `Question ${obj.questionId}`;
  question.innerHTML = `${obj.question}`;
  labels[0].innerHTML = `${obj.optionA}`;
  labels[1].innerHTML = `${obj.optionB}`;
  labels[2].innerHTML = `${obj.optionC}`;
  labels[3].innerHTML = `${obj.optionD}`;
  if (options[counter] != -1) {
    inputs[options[counter]].checked = true;
  }
}

//this is an async function that will pause the thread till all the data from API has arrived and turned into object
// await sleep is required here to relax the thread for 1 sec
//if this wasnt here the thread will loop contineously and eat up all the RAM and freeze the system

async function loadData() {
  while (true) {
    if (data) {
      console.log(data);
      break;
    }
    await sleep();
  }
  update(counter);
}

loadData();

//adding event listners to prev and next buttons
//these event listeners will save the options and load up the next question
//by load I mean update(counter ++ or counter--) will be called

prev.addEventListener("click", () => {
  if (counter == 0) return;
  for (let i = 0; i < 4; i++) {
    if (inputs[i].checked) {
      options[counter] = i;
      if (data[counter].correctOption == corOpt[i]) answers[counter] = true;
      else answers[counter] = false;
      inputs[i].checked = false;
      break;
    }
  }
  if (counter != 0) {
    counter -= 1;
    update(counter);
  }
});

next.addEventListener("click", () => {
  if (counter == 9) return;

  for (let i = 0; i < 4; i++) {
    if (inputs[i].checked) {
      options[counter] = i;
      if (data[counter].correctOption == corOpt[i]) answers[counter] = true;
      else answers[counter] = false;
      inputs[i].checked = false;
      break;
    }
  }
  if (counter != 9) {
    counter += 1;
    update(counter);
  }
});

//this is function that will render the thanks page through DOM manipulation
//it will also calculate the final score
//theres a security bug here, try to find it

function thanksPage() {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  container.style.alignItems = "center";
  let score = 0;
  for (let i = 0; i < 10; i++) {
    if (answers[i]) score++;
  }
  container.innerHTML = `<div class="heading final">You Scored <span class="score">${score}</span> out of 10</div>`;
  const button = document.createElement("a");
  button.href = "../index.html";
  button.className += "btn";
  button.innerText = "I WANNA TRY AGAIN";
  container.append(button);
}

//below is an implementation of timer for 10 minutes in js
//this is a bit cumbersome try to shorten it

const timeInMinutes = 10; //time in minutes
let currentTime = Date.parse(new Date());
let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);

//change is the final game loop
//breaking of this loop will mean the time has ended and game is over
//termination of change wil prompt us to thank you page

async function change() {
  while (true) {
    if (currentTime >= deadline) {
      document.querySelector(".container").innerHTML = `HELLO WORLD`;
      thanksPage();
      break;
    }
    currentTime += 1000;
    await sleep();
    let secs = Math.trunc((deadline - currentTime) / 1000);
    let mins = Math.trunc(secs / 60);
    secs = secs % 60;
    clock.innerHTML = `${mins} : ${secs}`;
  }
}

change();
