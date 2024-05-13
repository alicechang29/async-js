const BASE_URL = "http://numbersapi.com";

//http://numbersapi.com/random/year?json
async function showNumberTrivia(faveNum) {

  result = await fetch(`${BASE_URL}/${faveNum}?json`);

  jsonResult = await result.json();
  //first await all of the json.

  console.log("jsonResult", jsonResult);

  console.log(jsonResult.text);
  //once jsonResult is an object, then we can access the key

}