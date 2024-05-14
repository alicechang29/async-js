const $button = document.querySelector('#draw-card-button');
const $result = document.querySelector('#result');

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

let deckID = "";

/**Gets a deck of cards  */
async function getDeck() {
  const url = `${BASE_URL}/new/shuffle`;
  const response = await fetch(url);
  //get data out of the response object
  const deckData = await response.json();

  //sets the deckID in global scope
  deckID = deckData.deck_id;
}


/**Given a deckId, will draw a card from the deck
 * and return info about the card drawn
 */
async function drawCard() {
  console.log("drawCard");

  const url = `${BASE_URL}/${deckID}/draw`;
  const response = await fetch(url); //response object
  const cardData = await response.json();

  const cardSrc = cardData.cards[0].image;

  displayCard(cardSrc);

}

/**Displays the card on the DOM  */
function displayCard(cardSrc) {

  const $card = document.createElement("img");
  $card.src = cardSrc; //this is image url

  $result.append($card);
}


/**Handles start - gets deck of cards and adds event listener to button */
async function start() {
  //need to await the response bc it is a async fn.
  await getDeck();

  $button.addEventListener("click", drawCard);
}

start();