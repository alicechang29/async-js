const BASE_URL = "http://numbersapi.com";

//http://numbersapi.com/random/year?json
async function showNumberTrivia(faveNum) {

  const result = await fetch(`${BASE_URL}/${faveNum}?json`);

  const jsonResult = await result.json();
  //first await all of the json.

  console.log("jsonResult", jsonResult);

  console.log(jsonResult.text);
  //once jsonResult is an object, then we can access the key

}


async function showNumberRace(){
  const num1 = fetch(`${BASE_URL}/20?json`);
  const num2 = fetch(`${BASE_URL}/99?json`);
  const num3 = fetch(`${BASE_URL}/200?json`);
  const num4 = fetch(`${BASE_URL}/150?json`);
  
  const answerPromise = await Promise.race([num1, num2, num3, num4]);
  const winnerTrivia = await answerPromise.json();
  console.log(winnerTrivia.text);
}