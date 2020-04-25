'use strict'

import{drop} from 'ez-read';
import{back, cardContainer, newGameButton, scoreBoard, winMessage, shuffledCardFronts} from'./model';
import maybeFlip from './flip-card';
import maybeCheckMatch from './check-match';

cardContainer.addEventListener('click', runGame);
newGameButton.addEventListener('click',resetGame);
    let lastTwoSources = [];
    let lastTwoIds = [];
    let score = 0;
    
    function runGame(event) 
{
    const cardId = event.target.id;
    const cardNum = Number(drop(5, cardId));
    const source = event.target.src;

    const isFlipped = maybeFlip(cardId, cardNum, source);

    if (isFlipped)

    {
        lastTwoSources.push(event.target.src);
        lastTwoIds.push(cardId);
        const isMatch = maybeCheckMatch(lastTwoSources);
        runMatchLogic(isMatch)
        if(score === 5){
            winMessage.innerHTML="You won!";
        }
  }

}

function runMatchLogic(isMatch)
{
    if (isMatch === null)
    {
        return;
    }
    else if (isMatch === true)
    {
        score++;
        updateDisplayScore();
        clearTwoArrays();
    }
    else{
        resetlastTwoCards();
        clearTwoArrays();
    }
}
function updateDisplayScore()
{
    scoreBoard.innerHTML = `Score: ${score}`;
}

function clearTwoArrays()
{
    lastTwoSources = [];
    lastTwoIds = [];
}
function resetlastTwoCards()
{
    const card1 = document.querySelector(`#${lastTwoIds[0]}`);
    const card2 = document.querySelector(`#${lastTwoIds[1]}`);
    setTimeout(() => {
        card1.src = back;
        card2.src = back;
    }, 500);
}

function resetGame(){
    resetCards();
    score=0;
    scoreBoard.innerHTML='Score: 0';
    winMessage.innerHTML= '';
}

function resetCards(){
    for(let i=0; i<= 9; i++ ){
        const img = document.querySelector(`#card-${i}`)
        img.src=back;
    }
}