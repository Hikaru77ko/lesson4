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
const quizNumber = document.getElementById('quiz-number');
const genre = document.getElementById('genre');
const difficulty = document.getElementById('difficulty');
const startBtn = document.getElementById('start-btn');
const quizQuestion = document.getElementById('quiz-question');
const answerBtn = document.getElementById('answers');

//開始ボタンクリックの処理
startBtn.addEventListener('click', () => {
  processingScreen();
  startBtn.classList.add('none');
  correctAnswerCount = 0;
  quizNum = 1;
  quizIndex = 0;
});

//fetchApi取得中
const processingScreen = () => {
  quizNumber.textContent = '取得中';
  quizQuestion.textContent = '少々お待ち下さい';
  geQuizObject(url).then(data => getQuizDatas(data));
};

//各クイズデータを取り出しclassに入れる
const getQuizDatas = (data) =>{
  const quizData = new Createquiz(quizNum, data.results[quizIndex].category, data.results[quizIndex].difficulty, data.results[quizIndex].question, data.results[quizIndex].correct_answer, data.results[quizIndex].incorrect_answers)

  quizData.setQuiz();
  quizData.pushAnswer();
  quizData.createBtn(data);
};

//クラスを定義する
class Createquiz {

  constructor(quiznumber, genre, difficulty, question, correct_answer, incorrect_answers) {
    this.quiznumber = quiznumber;
    this.genre = genre;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
  
  //クイズをhtmlに反映させる
  setQuiz(){
    while (answerBtn.firstChild) {
      answerBtn.removeChild(answerBtn.firstChild);
    };
    quizNumber.textContent = `問題${this.quiznumber}`;
    genre.textContent = `[ジャンル] ${this.genre}`;
    difficulty.textContent = `[難易度] ${this.difficulty}`;
    quizQuestion.textContent = this.question;
  }

  //配列にpushする処理
  pushAnswer = () => {
    answers.push(this.incorrect_answers[0]);
    answers.push(this.incorrect_answers[1]);
    answers.push(this.incorrect_answers[2]);
    answers.push(this.correct_answer);
    this.shuffleAnswers();
  };

  //答えをランダムに並び替える処理
  shuffleAnswers = () => {
    for (let i = answers.length - 1; i >= 0; i--) {
      const shuffleAnswer = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[shuffleAnswer]] = [answers[shuffleAnswer], answers[i]];
    }
  };

  //ボタンの作成
  createBtn = (data) => {

    for (let i = 0; i < 4; i++) {
      const choiceBtn = document.createElement('button');
      choiceBtn.classList.add('block');
      choiceBtn.textContent = answers[i];
      answerBtn.appendChild(choiceBtn);

      choiceBtn.addEventListener('click', (e) => {
        if (e.target.textContent === this.correct_answer) {
          correctAnswerCount++;
        }

        quizIndex++;
        quizNum++;
        answers.length = 0;

        if (quizIndex < data.results.length) {
          getQuizDatas(data);
        } else {
          while (answerBtn.firstChild) {
            answerBtn.removeChild(answerBtn.firstChild);
          };
          quizNumber.textContent = `あなたの正解数は${correctAnswerCount}です`;
          quizQuestion.textContent = '再度チャレンジしたい場合は以下をクリック';
          genre.textContent = '';
          difficulty.textContent = '';
          startBtn.classList.remove('none');
          }
      });
    };
  };
};