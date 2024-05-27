let questionIndex = 1;

let answeredQuestions = [];
let questionStorage = [];
let alphabet = ` QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()~-=[]\;',./_+{}|:"<>?qwertyuiopasdfghjklzxcvbnm`;

function addQuestion() {
  let randomFour = [];
  while (randomFour.length < 4) {
    let newRandom = Math.ceil(Math.random() * 4);
    if (randomFour.includes(newRandom)) {
      randomFour = randomFour;
    } else {
      randomFour += newRandom;
    }
  }
  let questionContainer = document.querySelector('.test-questions');
  let userInput = document.querySelector('.question-title');
  questionContainer.innerHTML += `
    <div onmouseleave="
      questionNotHover(${questionIndex});
    " onmouseover="
      questionHover(${questionIndex});
    " class="pasted-question-container pasted-question-container${questionIndex}">
      <p class="pasted-test-title pasted-test-title${questionIndex}">${userInput.value}</p>
      <div class="question-details hide question-details${questionIndex}">
      <button onclick="
        editQuestion(${questionIndex});
      " class="blue-button"><img class="button-icon" src="edit-svgrepo-com.svg">Edit</button>
        <button onclick="
          deleteQuestion(${questionIndex});
        " class="red-button"><img class="button-icon" src="delete-svgrepo-com.svg">Delete</button>
      </div>
    </div>
  `;
  let correct = document.querySelector('.correct');
  let wrong1 = document.querySelector('.wrong1');
  let wrong2 = document.querySelector('.wrong2');
  let wrong3 = document.querySelector('.wrong3');
  let answerRepo = document.querySelector(`.pasted-question-container${questionIndex}`);
  for (i = 0; i < 4; i++) {
    if (randomFour[i] === '1') {
      answerRepo.innerHTML += `
        <button class="answer response1 answer${questionIndex}" onclick="
          select(${questionIndex}, 1);
        ">${correct.value}</button>
      `;
    } else if (randomFour[i] === '2') {
      answerRepo.innerHTML += `
        <button class="answer response2 answer${questionIndex}" onclick="
          select(${questionIndex}, 2);
        ">${wrong1.value}</button>
      `;
    } else if (randomFour[i] === '3') {
      answerRepo.innerHTML += `
        <button class="answer response3 answer${questionIndex}" onclick="
          select(${questionIndex}, 3);
        ">${wrong2.value}</button>
      `;
    } else {
      answerRepo.innerHTML += `
        <button class="answer response4 answer${questionIndex}" onclick="
          select(${questionIndex}, 4);
        ">${wrong3.value}</button>
      `;
    } 
  }
  questionStorage[questionIndex] = {t: `${userInput.value}`, c: `${correct.value}`, w1: `${wrong1.value}`, w2: `${wrong2.value}`, w3: `${wrong3.value}`};
  questionIndex += 1;
}

function select(questionIndex2, responseIndex) {
  if (testMode === 'Test') {
    for (i = 1; i < 5; i++) {
      let currentQuestion = document.querySelector(`.answer${questionIndex2}.response${i}`);
      currentQuestion.classList.remove('isSelected');
    }
    let currentSelection = document.querySelector(`.answer${questionIndex2}.response${responseIndex}`);
    answeredQuestions[questionIndex2] = currentSelection.innerHTML;
    currentSelection.classList.add('isSelected');
  }
}

function updateTitle() {
  let userTitleInput = document.querySelector('.test-input-title');
  let testTitle = document.querySelector('.test-title');
  testTitle.innerHTML = userTitleInput.value;
}

let testMode = 'Edit';

function handleTestMode() {
  let button = document.querySelector('.mode-switch');
  let editInfo = document.querySelector('.not-the-test');
  let grid = document.querySelector('.grid');
  if (testMode === 'Edit') {
    testMode = 'Test';
    button.classList.add('make-fixed');
    button.innerHTML = '<img class="button-icon" src="edit-svgrepo-com.svg">Edit test';
    editInfo.classList.add('hide');
    grid.classList.add('one-column');
  } else {
    testMode = 'Edit';
    button.classList.remove('make-fixed');
    button.innerHTML = '<img class="button-icon" src="pencil-writing-on-a-paper-svgrepo-com.svg">Start test';
    editInfo.classList.remove('hide');
    grid.classList.remove('one-column');
    answeredQuestions = [];
  }
}

let deleteWarning = true;

function deleteQuestion(target) {
  if (deleteWarning === true) {
    let tint = document.querySelector('.background-tint');
    tint.classList.remove('hide');
    tint.innerHTML += `
    <div class="modal">
      <p class="section-title">Are you sure you want to delete this question?</p>
      <p style="display: flex; align-items: center; column-gap: 5px;" class="title"><button onclick="
        dontRemindMe();
      " class="check"></button>Don't remind me again</p>
      <div class="button-container">
        <button onclick="
          deleteQuestionFinale(${target});
        " class="red-button"><img class="button-icon" src="delete-svgrepo-com.svg">Yes</button>
        <button onclick="
          closeDelete();
        " class="blue-button"><img class="button-icon" src="undo-svgrepo-com.svg">No</button>
      </div>
    </div>
    `;
  } else {
    deleteQuestionFinale(target);
  }
}

function dontRemindMe() {
  let checkBox = document.querySelector('.check');
  if (deleteWarning) {
    checkBox.innerHTML = '&#10003;';
    checkBox.classList.add('checked');
    deleteWarning = false;
  } else {
    checkBox.innerHTML = '';
    checkBox.classList.remove('checked');
    deleteWarning = true;
  }
}

function closeDelete() {
  let tint = document.querySelector('.background-tint');
  tint.innerHTML = '';
  tint.classList.add('hide');
}

function deleteQuestionFinale(target) {
  let fullTarget = document.querySelector(`.pasted-question-container${target}`);
  fullTarget.remove();
  questionStorage[target] = {};
  closeDelete();
}

function questionHover(questionIndex3) {
  let questionDetails = document.querySelector(`.question-details${questionIndex3}`);
  let currentElement = document.querySelector(`.pasted-question-container${questionIndex3}`);
  if (testMode === 'Edit') {
    questionDetails.classList.remove('hide');
    currentElement.classList.add('pasted-question-container-hover');
  }
}

function questionNotHover(questionIndex4) {
  let questionDetails = document.querySelector(`.question-details${questionIndex4}`);
  let currentElement = document.querySelector(`.pasted-question-container${questionIndex4}`);
  questionDetails.classList.add('hide');
  currentElement.classList.remove('pasted-question-container-hover');
}

function editQuestion(questionIndex5) {
  let editHt2 = document.querySelector('.editAdd');
  editHt2.innerHTML = `
    <p class="section-title">Edit question</p>
    <p class="title-two title-edit">Change question title</p>
    <input placeholder="Your new question" class="normal-input question-title-edit">
    <div class="new-question-grid2">
      <div class="line-break"></div><div class="line-break"></div>
      <p class="title">New correct answer:</p>
      <input placeholder="Your new correct answer" class="thin-input correct-edit">
      <div class="line-break"></div><div class="line-break"></div>
      <p class="title">New wrong answer #1:</p>
      <input class="thin-input wrong1-edit" placeholder="Your new wrong answer">
      <p class="title">New wrong answer #2:</p>
      <input class="thin-input wrong2-edit" placeholder="Your new wrong answer">
      <p class="title">New wrong answer #3:</p>
      <input class="thin-input wrong3-edit" placeholder="Your new wrong answer">
    </div>
    <div class="button-container">
      <button class="blue-button" onclick="
        finalEditQuestion(${questionIndex5});
      "><img class="button-icon" src="pencil-writing-on-a-paper-svgrepo-com.svg">Save question</button>
      <button class="white-button" onclick="
        escapeEdit();
      "><img class="button-icon" src="undo-svgrepo-com.svg">Cancel!</button>
    </div>
  `;
  let title = document.querySelector('.question-title-edit');
  let correct = document.querySelector('.correct-edit');
  let wrong1 = document.querySelector('.wrong1-edit');
  let wrong2 = document.querySelector('.wrong2-edit');
  let wrong3 = document.querySelector('.wrong3-edit');
  title.value = questionStorage[questionIndex5].t;
  correct.value = questionStorage[questionIndex5].c;
  wrong1.value = questionStorage[questionIndex5].w1;
  wrong2.value = questionStorage[questionIndex5].w2;
  wrong3.value = questionStorage[questionIndex5].w3;
}

function escapeEdit() {
  let editHt2 = document.querySelector('.editAdd');
  editHt2.innerHTML = `
    <p class="section-title">Add question</p>
    <p class="title-two">Make a title for your question</p>
    <input placeholder="Your question" class="normal-input question-title">
    <div class="new-question-grid">
      <div class="line-break"></div><div class="line-break"></div>
      <p class="title">Correct answer:</p>
      <input placeholder="Your correct answer" class="thin-input correct">
      <div class="line-break"></div><div class="line-break"></div>
      <p class="title">Wrong answer #1:</p>
      <input class="thin-input wrong1" placeholder="Add something relating to the question, but wrong">
      <p class="title">Wrong answer #2:</p>
      <input class="thin-input wrong2" placeholder="Your wrong answer...">
      <p class="title">Wrong answer #3:</p>
      <input class="thin-input wrong3" placeholder="Another wrong answer">
    </div>
    <div class="button-container">
      <button class="blue-button" onclick="
        addQuestion();
      "><img class="button-icon" src="plus-svgrepo-com.svg">Add Question</button>
    </div>
  `;
}

function finalEditQuestion(questionIndex6) {
  let titleEdit = document.querySelector('.question-title-edit');
  let correctEdit = document.querySelector('.correct-edit');
  let wrong1Edit = document.querySelector('.wrong1-edit');
  let wrong2Edit = document.querySelector('.wrong2-edit');
  let wrong3Edit = document.querySelector('.wrong3-edit');
  let titleOld = document.querySelector(`.pasted-test-title${questionIndex6}`);
  let correctOld = document.querySelector(`.response1.answer${questionIndex6}`);
  let wrong1Old = document.querySelector(`.response2.answer${questionIndex6}`);
  let wrong2Old = document.querySelector(`.response3.answer${questionIndex6}`);
  let wrong3Old = document.querySelector(`.response4.answer${questionIndex6}`);
  titleOld.innerHTML = `${titleEdit.value}`;
  correctOld.innerHTML = `${correctEdit.value}`;
  wrong1Old.innerHTML = `${wrong1Edit.value}`;
  wrong2Old.innerHTML = `${wrong2Edit.value}`;
  wrong3Old.innerHTML = `${wrong3Edit.value}`;
  questionStorage[questionIndex6] = {t: `${titleEdit.value}`, c: `${correctEdit.value}`, w1: `${wrong1Edit.value}`, w2: `${wrong2Edit.value}`, w3: `${wrong3Edit.value}`};
  escapeEdit();
}

let output = '';

function randomBySeedAndAmount(seed, amount) {
  let newSeed = String(Math.ceil(Math.abs(seed)) * 12);
  let dividendIndex = 0;
  let diviserIndex = 1;
  let emergencyNumber = 1;
  let dividend = 0;
  let diviser = 0;
  let multiplier = Number(newSeed[0] + newSeed[1]);
  if (multiplier === 0) {
    multiplier = 12;
  }
  while (newSeed.length < amount) {
    if (newSeed[dividendIndex] === '0') {
      dividend = emergencyNumber;
    } else {
      dividend = Number(newSeed[dividendIndex]);
    }
    if (newSeed[diviserIndex] === '0') {
      diviser = emergencyNumber;
    } else {
      diviser = Number(newSeed[diviserIndex]);
    }
    newSeed += Math.ceil((dividend / diviser) * multiplier);
    dividendIndex += 1;
    diviserIndex += 1;
    if (emergencyNumber === 9) {
      emergencyNumber = 1;
    } else {
      emergencyNumber += 1;
    }
  }
  output = newSeed;
}

let newStorage = '';
const key = 13579;

function generateSaveCode()  {
  newStorage = '';
  let stringStorage = JSON.stringify(questionStorage);
  randomBySeedAndAmount(key, stringStorage.length);
  output = String(output);
  for (i = 0;  i < stringStorage.length; i++) {
    let currentCharLocation = alphabet.indexOf(stringStorage[i]);
    if (currentCharLocation != -1) {
      let difference = currentCharLocation + Number(output[i]);
      if (alphabet.length <= difference) {
        difference = difference - alphabet.length;
      }
      newStorage += alphabet[difference];
    } else {
      newStorage += stringStorage[i];
    }
  }
  document.querySelector('.output-code').value = newStorage;
}

function copySaveCode() {
  navigator.clipboard.writeText(newStorage);
}

let tempStorage = '';

function loadTest() {
  tempStorage = '';
  let inputCode = String(document.querySelector('.input-code').value);
  randomBySeedAndAmount(key, inputCode.length);
  for (i = 0; i < inputCode.length; i++) {
    let currentCharLocation = alphabet.indexOf(inputCode[i]);
    if (currentCharLocation != -1) {
      let difference = currentCharLocation - Number(output[i]);
      if (difference < 0) {
        difference = alphabet.length + difference;
      }
      tempStorage += alphabet[difference];
    } else {
      tempStorage += inputCode[i];
    }
  }
  questionStorage = JSON.parse(tempStorage);
  console.log(questionStorage);
  drawTest();
}

function drawTest() {
  questionIndex = 1;
  let test = document.querySelector('.test-questions');
  test.innerHTML = `
    <div class="button-container">
      <button onclick="
        handleTestMode();
      " class="blue-button mode-switch"><img class="button-icon" src="pencil-writing-on-a-paper-svgrepo-com.svg">Start test</button>
    </div>
    <p class="test-title"></p>
  `;
  for (i = 1; i < questionStorage.length; i++) {
    if (questionStorage[i].t != undefined) {
      let randomFour = [];
      while (randomFour.length < 4) {
        let newRandom = Math.ceil(Math.random() * 4);
        if (randomFour.includes(newRandom)) {
          randomFour = randomFour;
        } else {
          randomFour += newRandom;
        }
      }
      test.innerHTML += `
        <div onmouseleave="
          questionNotHover(${questionIndex});
        " onmouseover="
          questionHover(${questionIndex});
        " class="pasted-question-container pasted-question-container${questionIndex}">
          <p class="pasted-test-title pasted-test-title${questionIndex}">${questionStorage[i].t}</p>
          <div class="question-details hide question-details${questionIndex}">
          <button onclick="
            editQuestion(${questionIndex});
          " class="blue-button"><img class="button-icon" src="edit-svgrepo-com.svg">Edit</button>
            <button onclick="
              deleteQuestion(${questionIndex});
            " class="red-button"><img class="button-icon" src="delete-svgrepo-com.svg">Delete</button>
          </div>
        </div>
      `;
      let correct = questionStorage[i].c;
      let wrong1 = questionStorage[i].w1;
      let wrong2 = questionStorage[i].w2;
      let wrong3 = questionStorage[i].w3;
      let answerRepo = document.querySelector(`.pasted-question-container${questionIndex}`);
      for (t = 0; t < 4; t++) {
        if (randomFour[t] === '1') {
          answerRepo.innerHTML += `
            <button class="answer response1 answer${questionIndex}" onclick="
              select(${questionIndex}, 1);
            ">${correct}</button>
          `;
        } else if (randomFour[t] === '2') {
          answerRepo.innerHTML += `
            <button class="answer response2 answer${questionIndex}" onclick="
              select(${questionIndex}, 2);
            ">${wrong1}</button>
          `;
        } else if (randomFour[t] === '3') {
          answerRepo.innerHTML += `
            <button class="answer response3 answer${questionIndex}" onclick="
              select(${questionIndex}, 3);
            ">${wrong2}</button>
          `;
        } else {
          answerRepo.innerHTML += `
            <button class="answer response4 answer${questionIndex}" onclick="
              select(${questionIndex}, 4);
            ">${wrong3}</button>
          `;
        } 
      }
      questionIndex += 1;
    }
  }
}

function drawQuestion(type) {
  let addQuestionHTML = document.querySelector('.editAdd');
  if (type === 'TF') {
    addQuestionHTML.innerHTML = `
      
    `;
  }
}