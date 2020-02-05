/////////////*****QUIZ DATA OBJECT******////////////////////

const quizData = [
	{
		id: 1,
		question: ` Which are the most poisonous snakes  in the world ???`,
		options: [`Mambas`, `King Kobras`, `Vipers`, `Taipans`],
		answer: `Vipers`
	},
	{
		id: 2,
		question: `Which is the world's Longest River ???`,
		options: [`River Nile`, `River Yangtze`, `River Congo`, `River Amazon`],
		answer: `River Nile`
	},
	{
		id: 3,
		question: ` Which is the largest country in the world ???`,
		options: [`USA`, `Canada`, `Russia`, `India`],
		answer: `Russia`
	},
	{
		id: 4,
		question: `Which is the most intelligent sea animal ???`,
		options: [`Sea Otter`, `Orca`, `Octopus`, `Dolphin`],
		answer: `Sea Otter`
	}
];

/////////////*****SCORE COUNT LOGIC ******////////////////////
let questionCount = 0;
let questionNumber = 1;
let score = 0;

const appendScore = count => {
	if (count >= quizData.length) {
		const body = document.querySelector('body');
		const scoreTag = document.querySelector('.score');
		const medal = document.querySelector('.medal');
		const questionNo = document.querySelector('.question-no');


		///////////////////******** MEDALS *******//////////////

		const gold = '🥇';
		const silver = '🥈';
		const bronze = '🥉';

		//////////******** ISSUING MEDALS BASED ON SCORES *******////////

		if (score <= 2) {
			medal.textContent = bronze;
		} else if (score == 3) {
			medal.textContent = silver;
		} else if (score == 4) {
			medal.textContent = gold;
		}

		questionNo.textContent = '';
		scoreTag.textContent = `SCORE = ${score} `;
		body.style.background = '#1DF3E8';
	}
};

///////////////////********APENDING QUESTIONS LOGIC *******/////////////////////

const appendingQuestions = quiz => {
	appendScore(questionCount);
	const parent = document.querySelector('.collection-item');
	const questionNo = document.querySelector('.question-no');

	parent.innerHTML = `
	<span class="question">
		<li> ${quiz[questionCount].question}</li>
	</span>`;

	const choicesContainer = document.createElement('div');
	choicesContainer.classList = 'choices-container ';
	const choicesUl = document.createElement('ul');

	quiz[questionCount].options.map(choice => {
		const choicesCollection = `
		<div class="collection-item">
			<li class="choices-list">${choice}</li>
		</div>
		`;
		choicesUl.innerHTML += choicesCollection;
	});

	choicesContainer.appendChild(choicesUl);
	parent.appendChild(choicesContainer);
	questionNo.textContent = `${quiz[questionCount].id}:`;
};

appendingQuestions(quizData);

///////////////////********CHECH ANSWER LOGIC *******/////////////////////

let answer;

const checkAnswer = () => {
	const body = document.querySelector('body');
	const parent = document.querySelector('.collection-item');
	const answersContainer = document.querySelectorAll('.choices-container');
	for (const answers of answersContainer) {
		answers.addEventListener('click', e => {
			answer = quizData[questionCount].answer;
			if (quizData[questionCount].answer === e.target.innerText) {
				parent.innerHTML = '';
				body.style.background = 'rgba(54, 236, 18, 0.829)';
				score++;
				questionNumber++;
				questionCount++;
				correct();
				appendNewQuestion();
			} else {
				parent.innerHTML = '';
				body.style.background = 'red';
				questionNumber++;
				questionCount++;
				wrong();
				appendNewQuestion();
			}
		});
	}
};
checkAnswer();

const appendNewQuestion = () => {
	appendingQuestions(quizData);
	checkAnswer();
};

///////////////////********CORRECT ANSWER ALERT *******/////////////////////

const correct = () => {
	Swal.fire({
		type: 'success',
		title: '<h4 style="color:red;">Correct 🏅 !!!</h4>',
		text: `Keep Going Champ !!!`,
		footer: '<h4>🔥🔥🔥🔥</h4>'
	});
};

///////////////////********WRONG ANSWER ALERT *******/////////////////////

const wrong = () => {
	Swal.fire({
		type: 'error',
		title: 'Wrong 👎 !!!',
		text: 'Oops...You chose the wrong answer!',
		footer: `
		<a>
			The correct answer is:
			<h4 style="color:red;">"${answer}"</h4>
		 </a>`
	});
};
