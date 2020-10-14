'use strict'
const url = 'https://opentdb.com/api.php?amount=10';

function fetchApi(url){
  return fetch(url).then(response => response.json());
};
async function geQuizObject(url){
  const response = await fetchApi(url)
    return response
};

let quizNum = 1;
let quizIndex = 0;
let answers = [];
let correctAnswerCount = 0;

//DOM要素を取得
const $quizNumber = document.getElementById('quiz-number');
const $genre = document.getElementById('genre');
const $difficulty = document.getElementById('difficulty');
const $startBtn = document.getElementById('start-btn');
const $quizQuestion = document.getElementById('quiz-question');
const $answers = document.getElementById('answers');

//fetchApi取得中
const processingScreen = () => {
  $quizNumber.textContent = '取得中';
  $quizQuestion.textContent = '少々お待ち下さい';
  geQuizObject(url).then(data => setQuiz(data));
};

//開始ボタンクリックの処理
$startBtn.addEventListener('click', () => {
  processingScreen();
  $startBtn.classList.add('none');
   correctAnswerCount = 0;
   quizNum = 1;
   quizIndex = 0;
});

//問題文をセット
const setQuiz = (data) => {
  console.log(data.results);
  while ($answers.firstChild) {
    $answers.removeChild($answers.firstChild);
  };
  $quizNumber.textContent = `問題${quizNum}`;
  $genre.textContent = `[ジャンル] ${data.results[quizIndex].category}`;
  $difficulty.textContent = `[難易度] ${data.results[quizIndex].difficulty}`;
  $quizQuestion.textContent = data.results[quizIndex].question;
  pushAnswer(data)
  createBtn(data);
};

//配列の中に答えをプッシュする処理
const pushAnswer = (data) => {
  answers.push(data.results[quizIndex].incorrect_answers[0]);
  answers.push(data.results[quizIndex].incorrect_answers[1]);
  answers.push(data.results[quizIndex].incorrect_answers[2]);
  answers.push(data.results[quizIndex].correct_answer);
  shuffleAnswers();
};

//答えをランダムに並び替える処理
const shuffleAnswers = () => {
  for (let i = answers.length - 1; i >= 0; i--) {
    const shuffleAnswer = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[shuffleAnswer]] = [answers[shuffleAnswer], answers[i]];
  }
};

//ボタンの作成
const createBtn = (data) => {
  const createBtnOne = document.createElement('button');
  const createBtnTwo = document.createElement('button');
  const createBtnThree = document.createElement('button');
  const createBtnFour = document.createElement('button');

  createBtnOne.classList.add('block');
  createBtnTwo.classList.add('block');
  createBtnThree.classList.add('block');
  createBtnFour.classList.add('block');

  createBtnOne.textContent = answers[0];
  createBtnTwo.textContent = answers[1];
  createBtnThree.textContent = answers[2];
  createBtnFour.textContent = answers[3];

  $answers.appendChild(createBtnOne);
  $answers.appendChild(createBtnTwo);
  $answers.appendChild(createBtnThree);
  $answers.appendChild(createBtnFour);
  
    //各ボタンにクリックイベントを追加
    createBtnOne.addEventListener('click', (e) => {
      if (e.target.textContent === data.results[quizIndex].correct_answer) {
        correctAnswerCount++;
      }

      quizIndex++;
      quizNum++;
      answers.length = 0;

      if (quizIndex < data.results.length) {
        setQuiz(data);
      } else {
        while ($answers.firstChild) {
          $answers.removeChild($answers.firstChild);
        };
        $quizNumber.textContent = `あなたの正解数は${correctAnswerCount}です`;
        $quizQuestion.textContent = '再度チャレンジしたい場合は以下をクリック';
        $genre.textContent = '';
        $difficulty.textContent = '';
        $startBtn.classList.remove('none');
      }
    });
    createBtnTwo.addEventListener('click', (e) => {
      if (e.target.textContent === data.results[quizIndex].correct_answer) {
        correctAnswerCount++;
      }

      quizIndex++;
      quizNum++;
      answers.length = 0;

      if (quizIndex < data.results.length) {
        setQuiz(data);
      } else {
        while ($answers.firstChild) {
          $answers.removeChild($answers.firstChild);
        };
        $quizNumber.textContent = `あなたの正解数は${correctAnswerCount}です`;
        $quizQuestion.textContent = '再度チャレンジしたい場合は以下をクリック';
        $genre.textContent = '';
        $difficulty.textContent = '';
        $startBtn.classList.remove('none');
      }
    });
    createBtnThree.addEventListener('click', (e) => {
      if (e.target.textContent === data.results[quizIndex].correct_answer) {
        correctAnswerCount++;
      }

      quizIndex++;
      quizNum++;
      answers.length = 0;

      if (quizIndex < data.results.length) {
        setQuiz(data);
      } else {
        while ($answers.firstChild) {
          $answers.removeChild($answers.firstChild);
        };
        $quizNumber.textContent = `あなたの正解数は${correctAnswerCount}です`;
        $quizQuestion.textContent = '再度チャレンジしたい場合は以下をクリック';
        $genre.textContent = '';
        $difficulty.textContent = '';
        $startBtn.classList.remove('none');
      }
    });
    createBtnFour.addEventListener('click', (e) => {
      if (e.target.textContent === data.results[quizIndex].correct_answer) {
        correctAnswerCount++;
      }

      quizIndex++;
      quizNum++;
      answers.length = 0;

      if (quizIndex < data.results.length) {
        setQuiz(data);
      } else {
        while ($answers.firstChild) {
          $answers.removeChild($answers.firstChild);
        };
        $quizNumber.textContent = `あなたの正解数は${correctAnswerCount}です`;
        $quizQuestion.textContent = '再度チャレンジしたい場合は以下をクリック';
        $genre.textContent = '';
        $difficulty.textContent = '';
        $startBtn.classList.remove('none');
      }
    });
};