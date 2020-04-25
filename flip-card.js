import {back, shuffledCardFronts } from './model';

function maybeFlip(cardId, cardNum, source)
{

    if (source === 'http://localhost:33779/card-back.d677e786.png')
    { 
         flipCard(cardId, cardNum)
         return true;
    }

         return false;
}


function flipCard(cardId, cardNum)
{  
 document.querySelector(`#${cardId}`).src = shuffledCardFronts[cardNum];
}


export default maybeFlip;