let beginner;let intermediate;let advanced;let fullList;let currentRow = 0;let nextRowBlock = 0;let score = 0;let remNotification = 0;let gameFin = 0;let gameOn = 0;let maxBlock = 5;let level = 'beginner';let difficulty = 'easy';let mustUse = '';let bestStreak = 0;let currentStreak = 0;let userScore = 0;let scoreEasyBeginner3 = 0;let scoreEasyIntermediate3 = 0;let scoreEasyAdvanced3 = 0;let scoreEasyGod3 = 0;let scoreEasyBeginner4 = 0;let scoreEasyIntermediate4 = 0;let scoreEasyAdvanced4 = 0;let scoreEasyGod4 = 0;let scoreEasyBeginner5 = 0;let scoreEasyIntermediate5 = 0;let scoreEasyAdvanced5 = 0;let scoreEasyGod5 = 0;let scoreDifficultBeginner3 = 0;let scoreDifficultIntermediate3 = 0;let scoreDifficultAdvanced3 = 0;let scoreDifficultGod3 = 0;let scoreDifficultBeginner4 = 0;let scoreDifficultIntermediate4 = 0;let scoreDifficultAdvanced4 = 0;let scoreDifficultGod4 = 0;let scoreDifficultBeginner5 = 0;let scoreDifficultIntermediate5 = 0;let scoreDifficultAdvanced5 = 0;let scoreDifficultGod5 = 0;let streakEasyBeginner3 = 0;let streakEasyIntermediate3 = 0;let streakEasyAdvanced3 = 0;let streakEasyGod3 = 0;let streakEasyBeginner4 = 0;let streakEasyIntermediate4 = 0;let streakEasyAdvanced4 = 0;let streakEasyGod4 = 0;let streakEasyBeginner5 = 0;let streakEasyIntermediate5 = 0;let streakEasyAdvanced5 = 0;let streakEasyGod5 = 0;let streakDifficultBeginner3 = 0;let streakDifficultIntermediate3 = 0;let streakDifficultAdvanced3 = 0;let streakDifficultGod3 = 0;let streakDifficultBeginner4 = 0;let streakDifficultIntermediate4 = 0;let streakDifficultAdvanced4 = 0;let streakDifficultGod4 = 0;let streakDifficultBeginner5 = 0;let streakDifficultIntermediate5 = 0;let streakDifficultAdvanced5 = 0;let streakDifficultGod5 = 0;let scoreType = 'score';let scoreDiff = 'easy';

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let container = document.createElement('div');
container.id = 'container';
document.body.append(container);

startMenu();

function showScores(modal, type, diff){
	let msBlock = document.createElement('div');
	msBlock.id = 'msBlock';
	modal.append(msBlock);
	for(i = 0; i < 4; i++){
		let modalScoreBlock = document.createElement('div');
		modalScoreBlock.className = 'msBlock';
			let msHeadContent = (i == 0)? 'BEGINNER' : ((i == 1)? 'INTERMEDIATE' : ((i == 2)? 'ADVANCED' : 'GOD MODE'));
			let modalScoreHead = document.createElement('span');
			modalScoreHead.className = 'msHead';
			modalScoreHead.innerText = msHeadContent;
			modalScoreBlock.append(modalScoreHead);
	
			let msBodyContent = localStorage.getItem(type + diff + msHeadContent.toLowerCase().replace(/ /g, ""));
			let modalScoreBody = document.createElement('span');
			modalScoreBody.className = 'msBody';
			modalScoreBody.innerText = (msBodyContent == null)? 0 : msBodyContent;
			modalScoreBlock.append(modalScoreBody);
		msBlock.append(modalScoreBlock);
	}
}

function showHelp(modal, type){
	let exampleWords = ['SUNNY', 'WORLD', 'TITAN'];
	let mhBlock = document.createElement('div');
	mhBlock.id = 'mhBlock';
	mhbHead = document.createElement('div');
	mhbHead.className = 'mhbHead';
	mhbHead.innerText = (type == 'game')? 'You have 6 tries to guess the word.\n\nOnly valid words are allowed. Hit enter to submit your guess.\n\nWith each guess, the colour of the tiles will change to show you how close your guess is to the word.' : 'There are 4 different levels ranging between beginner and God mode. The higher the level, the more words will be in play and the harder it will be to guess.\n\nYou can change the level either in the main menu or in play by clicking on the currently stated level.';
	mhBlock.append(mhbHead);

	let mhbBody = document.createElement('div');
	mhbBody.className = 'mhbBody';

	if(type == 'game'){
		for(i = 0; i < exampleWords.length; i++){
			let rand = Math.floor(Math.random() * 5);
			let tileClass = (i == 0)? 'blockGreen' : ((i == 1)? 'blockGold' : 'blockGrey');
			let exNotification = '';
			let exampleRow = document.createElement('div');
			exampleRow.className = 'exampleRow';
			for(j = 0; j < exampleWords[i].length; j++){
				let exampleTile = document.createElement('span');
				exampleTile.className = (j == rand)? 'exampleTile ' + tileClass : 'exampleTile';
				exampleTile.innerText = exampleWords[i][j];
				exampleRow.append(exampleTile);
				exNotification += (j == rand)? '<strong>' + exampleWords[i][j] + '</strong>' : '';
			}
			exNotification += (i == 0)? ' is in the word and in the correct place' : ((i == 1)? ' is in the word but in the wrong place' : ' is not in the word');
			let exNotRow = document.createElement('div');
			exNotRow.innerHTML = exNotification;
			exampleRow.append(exNotRow);
			mhbBody.append(exampleRow);
		}
	}else{
		mhbBody.className = 'mhbHead';
		mhbBody.innerText = '\nIn addition to the levels, there are 2 difficulty modes - easy and difficult. You can use any valid words within your guesses in easy mode.\n\nIn difficult mode, you must reuse any letters that you have previously chosen and are found to be within the word.\n\nYou can quit the game at any time by clicking on the give up button, which will deduct 15 points from your score and show you the current word.';
	}
	mhBlock.append(mhbBody);
	modal.append(mhBlock);
}

function openModal(type, notification){
	let modal = document.createElement('div');
	modal.id = 'modal';
	if(type == 'endScore'){
		let message = document.createElement('span');
		message.className = 'modalMessage';
		message.innerHTML = notification;
		modal.append(message);
		
		setTimeout(function(){
			document.addEventListener('click', restartClick);
			document.addEventListener('keyup', restart);
		}, 100);
	}
	else if(type == 'help'){
		for(i = 0; i < 2; i++){
			let helpBtn = document.createElement('button');
			helpBtn.className = (i == 0)? 'helpBtnActive' : 'helpBtn';
			helpBtn.innerText = (i == 0 || i == 2)? 'GAME' : 'OPTIONS';
			helpBtn.j = i;
			helpBtn.modal = modal;
			helpBtn.addEventListener('click', changeHelpView);
			modal.append(helpBtn);
		}
		showHelp(modal, 'game');
	}

	container.prepend(modal);
	setTimeout(function(){
		modal.style.cssText = 'opacity: 1';
	}, 1);

	let shadowBack = document.createElement('div');
	shadowBack.id = 'shadowBack';
	container.prepend(shadowBack);
	setTimeout(function(){
		shadowBack.style.cssText = 'opacity: .35';
	}, 1);

	let modalClose = document.createElement('button');
	modalClose.id = 'modalClose';
	modalClose.innerText = 'close';
	modalClose.modal = modal;
	modalClose.shadowBack = shadowBack;
	modalClose.addEventListener('click', closeModal);
	modal.prepend(modalClose);
}

function openWindow(url, windowName){
	window.open(url, windowName,'width=550,height=450,left=150,top=200,toolbar=0,status=0,data-action=share/whatsapp/share')
}

function addLogo(){
	let logo = document.createElement('div');
	logo.className = 'logo';
	logo.addEventListener("click", logoClick);

	let domName = 'WORDLE@lg2';
	for(i = 0; i < domName.length; i++){
		let spanClass = (i == 0 || i % 2 == 0)? 'logo_green' : 'logo_gold';
		let logoSpan = document.createElement('span');
		logoSpan.className = spanClass;
		logoSpan.innerText = domName[i];
		logo.append(logoSpan);
	}

	container.append(logo);
}

function changeHelpView(){
	let j = event.currentTarget.j;
	let modal = event.currentTarget.modal;
	document.getElementsByClassName('helpBtnActive')[0].className = 'helpBtn';
	this.className = 'helpBtnActive';
	if(j == 0){
		document.getElementById('mhBlock').remove();
		showHelp(modal, 'game');
	}else{
		document.getElementById('mhBlock').remove();
		showHelp(modal, 'options');
	}
}

function startMenu(){
	if(document.getElementById('wordscript') != null){
		document.getElementById('wordscript').remove();
	}
	let script = document.createElement('script');
	script.id = 'wordscript';
	script.src = './assets/js/words/' + maxBlock + '.js';
	document.body.prepend(script);

	container.innerHTML = '';
	addLogo();
	let menu = document.createElement('div');
	menu.id = 'menu';

    let menuBtn = document.createElement('button');
    menuBtn.className = 'menuBtn';
    menuBtn.innerText = 'Play';
    menuBtn.j = 5;

    menuBtn.addEventListener("click", menuClick);
    menu.append(menuBtn);
	
    container.append(menu);
}

function gameOver(){
	gameFin = 1;
	document.removeEventListener('keyup', deleteClick, false);
	document.removeEventListener('keyup', keyPress, false);
	document.removeEventListener('keyup', restart, false);
	document.removeEventListener('click', logoClick, false);
	document.removeEventListener('click', menuClick, false);
	document.removeEventListener('click', enterClick, false);
	document.removeEventListener('click', closeModal, false);
}

function gameStart(){
	container.innerHTML = '';
	let wordType = listOfWords;

	var date1 = new Date("04/19/2022 00:00:00");
	var date2 = new Date(); 

	var Difference_In_Time = date2.getTime() - date1.getTime();
	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

	console.log(Math.floor(Difference_In_Days));
	// let rand = Math.floor(Math.random() * wordType.length);
	chosenWord = wordType[Math.floor(Difference_In_Days)].toUpperCase();

	addLogo();

	let gameArea = document.createElement('div');
	gameArea.className = 'game_area';
	for(i = 0; i < 6; i++){
		let row = document.createElement('div');
		row.className = 'row';
		for(j = 0; j < maxBlock; j++){
			let rowBlock = document.createElement('div');
			rowBlock.className = 'row_block';
			row.append(rowBlock);
		}
		gameArea.append(row);
	}
	container.append(gameArea);

	let notification = document.createElement('div');
	notification.id = 'notification';
	notification.innerText = 'Start guessing!'
	container.append(notification);

	let keyLayoutTop = 'QWERTYUIOP';
	let keyLayoutMid = 'ASDFGHJKL';
	let keyLayoutBot = 'ZXCVBNM';

	let keyboard = document.createElement('div');
	keyboard.id = 'keyboard';

		let topKeys = document.createElement('div');
		topKeys.id = 'topKeys';
		addKeys(topKeys, keyLayoutTop, 'keyboardKey_s');
		keyboard.append(topKeys);

		let midKeys = document.createElement('div');
		midKeys.id = 'midKeys';
		addKeys(midKeys, keyLayoutMid, 'keyboardKey_m');
		keyboard.append(midKeys);

		let botKeys = document.createElement('div');
		botKeys.id = 'botKeys';

		let deleteKey = document.createElement('span');
		deleteKey.className = 'keyboardKey_l';
		deleteKey.innerHTML = '&#x2190;';
		deleteKey.addEventListener("click", deleteClick);
		botKeys.append(deleteKey);
		addKeys(botKeys, keyLayoutBot, 'keyboardKey_s');

		let enterKey = document.createElement('span');
		enterKey.className = 'keyboardKey_l';
		enterKey.innerText = 'Enter';
		enterKey.addEventListener("click", enterClick);
		botKeys.append(enterKey);
		keyboard.append(botKeys);

	container.append(keyboard);

	document.addEventListener('keyup', keyPress);
}

function difficultyModal(){
	openModal('difficultySelect');
}

function keyPress(event) {
	if(gameFin == 0){
		let alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		for(i = 0; i < alphabet.length; i++){
			if ((event.key === alphabet[i] || event.key === alphabet[i].toUpperCase())) {
				addLetter(rowBlockEl, alphabet[i]);
			}
		}
		if(event.key === 'Enter') {
			submitWord(wordRow, keyPress);
		}
		if(event.key === 'Backspace') {
			deleteLetter(rowBlockEl);
		}
	}
}

function quitQlick(){
	if(gameFin == 0){
		let url = '<a href="https://duckduckgo.com/?q=%22'+ chosenWord +'%22+%22definition%22&ia=definition" target="_blank">' + chosenWord + '</a>';
		notification = 'The word was ' + url + '. Click to play again';
		currentStreak = 0;
		userScore = userScore - 15;
		gameOver();

		setTimeout(function(){
			openModal('endScore', notification);
		}, 250);
	}
}

function enterClick(){
	if(gameFin == 0){
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		submitWord(wordRow);
	}
}

function logoClick(event) {
	gameOn = 0;
	container.innerHTML = '';
	startMenu();
}

function menuClick(event) {
	let j = event.currentTarget.j;
	let modalType = (j == 0)? 'charSelect' : ((j == 1)? 'levelSelect' : ((j == 2)? 'difficultySelect' : ((j == 3)? 'highScores' : 'help')));
    //could add menu clicks here
    gameOn = 1;
    gameStart();

}

function restart(event) {
	if (event.key === 'Enter') {
		document.removeEventListener('keyup', restart, false);
		document.removeEventListener('click', restartClick, false);
		gameStart();
	}
}

function restartClick(){
	document.removeEventListener('keyup', restart, false);
	document.removeEventListener('click', restartClick, false);
	gameStart();
}

function closeModal(){
	let modal = event.currentTarget.modal;
	let shadowBack = event.currentTarget.shadowBack;
	modal.style.cssText = 'opacity:0';
	shadowBack.style.cssText = 'opacity:0';
	setTimeout(function(){
		modal.remove();
		shadowBack.remove();
	}, 355);
}

function deleteClick(){
	if(gameFin == 0){
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		deleteLetter(rowBlockEl);
	}
}

function keyboardPress(){
	if(gameFin == 0){
		let layout = event.currentTarget.layout;
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		addLetter(rowBlockEl, layout);
	}
}

function deleteLetter(rowBlockEl){
	if(nextRowBlock > 0){
		nextRowBlock--;
		rowBlockEl[nextRowBlock].innerText = '';
	}
}

function count(str, find) {
    return (str.split(find)).length - 1;
}

function checkAnswer(wordRow, answer){
	let answerArray = [];

	for(i = 0; i < answer.length; i++){
		let letter = answer[i].toUpperCase();
		answerArray.push(letter);
		let blockClass = 'blockGrey';
		if(chosenWord.toUpperCase().includes(letter)){
			if(chosenWord[i].toUpperCase() === letter){
				score++;
				blockClass = ' blockGreen';
				if(count(answer, letter) > count(chosenWord, letter)){
					for(j = 0; j < wordRow.childNodes.length; j++){
						if(wordRow.childNodes[j].innerText == letter && wordRow.childNodes[j].className == 'row_block  blockGold'){
							wordRow.childNodes[j].className = 'row_block  blockGrey';
							let index = answerArray.indexOf(letter);
							if (index !== -1) {
								answerArray.splice(index, 1);
							}
						}
					}
				}
			}else{
				if(countOccurrences(answerArray, letter) <= count(chosenWord, letter)){
					blockClass = ' blockGold';
				}
				else{
					blockClass = ' blockGrey';
				}
			}
		}
		wordRow.childNodes[i].className = 'row_block ' + blockClass;
		let keyboard = document.getElementById('keyboard_' + letter);
		if(chosenWord.toUpperCase().includes(letter)){
			if(letter == chosenWord[i]){
				if(!keyboard.className.includes('blockGreen')){
					keyboard.classList.remove('blockGold');
					keyboard.className += ' blockGreen';
				}
			}else{
				if(!keyboard.className.includes('blockGreen') && !keyboard.className.includes('blockGold')){
					keyboard.className += ' blockGold';
				}
			}
			if(count(answer, letter) > count(mustUse, letter) && count(mustUse, letter) <= count(chosenWord, letter)){
				mustUse += letter;
			}
		}
		else{
			if(!keyboard.className.includes('blockGrey')){
				keyboard.className += ' blockGrey';
			}
		}
	}

	if(score === maxBlock){
		currentStreak++;
		if(currentStreak > localStorage.getItem('streak' + difficulty + level)){
			localStorage.setItem('streak' + difficulty + level, currentStreak);
		}

		let notification = 'Well done, you won!';
		// gameOver();

		setTimeout(function(){
			openModal('endScore', notification);
		}, 250);
	}
	else if(currentRow == 5){
		let notification = 'You lost. The word was ' + chosenWord + '.';
		userScore = userScore - 10;
		currentStreak = 0;
		gameOver();

		setTimeout(function(){
			openModal('endScore', notification);
		}, 250);
	}
	else{
		score = 0;
		nextRowBlock = 0;
		currentRow++;
	}
}

function submitWord(wordRow){
	if(nextRowBlock > 0 && nextRowBlock % maxBlock == 0){
		let answer = wordRow.innerText.replace(/[\n\r]/g, '');
		if(fullList.includes(answer)){
			if(difficulty == 'difficult'){
				for(i = 0; i < mustUse.length; i++){
					if(!answer.includes(mustUse[i])){
						remNotification = 0;
						document.getElementById('notification').innerText = 'You must use found characters';
						return;
					}
				}
			}
			checkAnswer(wordRow, answer);		
		}else{
			remNotification = 0;
			document.getElementById('notification').innerText = 'Word not in list';
		}
	}else{
		remNotification = 0;
		document.getElementById('notification').innerText = 'You must enter ' + maxBlock + ' characters';
	}
}

function addKeys(el, layout, keyClass){
	for(i = 0; i < layout.length; i++){
		let key = document.createElement('span');
		key.className = keyClass;
		key.id = 'keyboard_' + layout[i];
		key.innerText = layout[i];
		key.layout = layout[i];
		key.addEventListener("click", keyboardPress);
		el.append(key);
	}
}

function addLetter(rowBlockEl, letter){
	if(remNotification == 0){
		remNotification = 1;
		document.getElementById('notification').innerText = '';
	}
	if(nextRowBlock < maxBlock){
		rowBlockEl[nextRowBlock].innerText = letter.toUpperCase();
		nextRowBlock++;
	}
}