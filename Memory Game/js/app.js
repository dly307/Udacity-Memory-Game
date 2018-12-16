// List of all cards
const allCards = ['fa fa-diamond', 'fa fa-diamond',
                'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
                'fa fa-anchor', 'fa fa-anchor',
                'fa fa-bolt', 'fa fa-bolt',
                'fa fa-cube', 'fa fa-cube',
                'fa fa-leaf', 'fa fa-leaf',
                'fa fa-bicycle', 'fa fa-bicycle',
                'fa fa-bomb', 'fa fa-bomb',
            ];

// puts any element with "deck" into a single variable container
const cardsContainer = document.querySelector('.deck');           

// array for clicked cards
let openCards = []; 

// array for matched cards
let matchCards = []; 

/*
 * Starting the game:  generating / creating / adding HTML to the page for each card
 */
let shuffledCards = shuffle(allCards); 
function inGame() {
    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement('li'); 
        card.classList.add('card');
        card.innerHTML = `<i class='${allCards[i]}'></i>`; 
        cardsContainer.appendChild(card); 
        
        click(card); 
    }
}
/* 
 * Clicking / selecting of the cards    
 */
 function click(card) {
    card.addEventListener("click", function() {

        if (startGame === 0) {
            timer();
            startGame++;
        }
        // variables for the first / second clicked cards
        const firstCard = this; 
        const secondCard = openCards[0];

        if (openCards.length === 1) {
            
            card.classList.add('open', 'show', 'disabled');
            openCards.push(this);
            
            comparison(firstCard, secondCard);
        
        } else {

            card.classList.add('open', 'show', 'disabled');
            openCards.push(this);
        }
    });
}
/*
 *  Comparing the two cards
 */ 
function comparison(firstCard, secondCard) {
    // if it DOES match
    if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        matchCards.push(firstCard, secondCard);
        openCards = [];  // resetting
        gameOver();

    } else {
        // if it does NOT match
        setTimeout(function() {
            firstCard.classList.remove('open', 'show', 'disabled');
            secondCard.classList.remove('open', 'show', 'disabled');
            openCards = [];  // resetting

        }, 500);  // wait half a second

        openCards = [];  // resetting
    }
    
    // Adding a turn
    addTurn();
}

/*
 * Number of turns taken
 */ 
const turnsContainer = document.querySelector('.moves');
let moves = 0; 
turnsContainer.innerHTML = 0;
function addTurn() {
    moves++;
    turnsContainer.innerHTML = moves;
    rating(moves);
}
/*
 * Rating System / removing stars
 */ 
let stars = 0;
const starsList = document.querySelector('.stars');
function rating(moves) {
    if (moves === 8) {
        starsList.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        return stars = 5; 
    } else if (moves > 8 && moves < 13) {
        starsList.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        return stars = 4; 
    } else if (moves > 13 && moves < 18) {
        starsList.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        return stars = 3; 
    } else if (moves > 18 && moves < 23) {
        starsList.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        return stars = 2; 
    } else if (moves > 23) {
        starsList.innerHTML = `
        <li><i class="fa fa-star"></i></li>`;
        return stars = 1; 
    }
}
/*
 * The Timer!
 */
time = document.querySelector('.clock');
time.innerHTML = ""; 
let startGame = 0;
let gameInterval;
function timer() {
    let seconds = 0; 
    let minutes = 0;
    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0; 
        }
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        time.innerHTML = minutes + ":" + seconds;

    }, 1000); 
}
function endTime() {
    clearInterval(gameInterval);
}
/*
 * End game
 */ 
function gameOver() {
    if (matchCards.length === allCards.length) {
        endTime();
        alert(`Congratulatons! \nYou've matched all the cards! \nStars: ${stars} \nMoves: ${moves + 1} \nTime: ${time.innerHTML}`); 
    }
}

/*
 * Restarting of the game
 */
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
    // Clearing the deck
    cardsContainer.innerHTML = "";
    // Calling new game
    inGame();
    // Emptying array of matched cards and restarting number of turns
    matchCards = [];
    openCards = [];
    moves = 0;
    startGame = 0;
    endTime();
    time.innerHTML = "00:00"; 
    turnsContainer.innerHTML = moves;
    shuffle(allCards);
    starsList.innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 // Start game for the first time
 window.onload = inGame();