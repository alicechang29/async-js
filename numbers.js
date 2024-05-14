const BASE_URL = "http://numbersapi.com";

//http://numbersapi.com/random/year?json

/**Gets trivia about favorite number from numbers api and
 * console logs the result */
async function showNumberTrivia(faveNum) {

  const result = await fetch(`${BASE_URL}/${faveNum}?json`); //FIXME: conventional - call it response

  const jsonResult = await result.json();
  //first await all of the json.

  console.log("jsonResult", jsonResult);

  console.log(jsonResult.text);
  //once jsonResult is an object, then we can access the key

}

/**Gets trivia about any of the numbers listed, and
 * console logs the first response from numbers api */
async function showNumberRace() {
  const num1 = fetch(`${BASE_URL}/20?json`);
  const num2 = fetch(`${BASE_URL}/99?json`);
  const num3 = fetch(`${BASE_URL}/200?json`);
  const num4 = fetch(`${BASE_URL}/150?json`);

  const answerPromise = await Promise.race([num1, num2, num3, num4]);
  const winnerTrivia = await answerPromise.json(); //FIXME: call it winnerResponse
  console.log(winnerTrivia.text);
}


async function showNumberAll() {

  const num1 = fetch(`${BASE_URL}/20?json`);
  const num2 = fetch(`${BASE_URL}/99?json`);
  const num3 = fetch(`${BASE_URL}/WRoNG?json`);
  const num4 = fetch(`${BASE_URL}/150?json`);

  const fetchResults = await Promise.allSettled([num1, num2, num3, num4]);

  // awaiting Promise.allSettled returns a list of objects
  // need to await the json for all the objects from the response obj

  const successResults = fetchResults.filter(
    r => r.status === "fulfilled" && r.value.ok === true
  );

  for (const response of successResults) {
    const responseValue = await response.value.json();
    const statusCode = response.value.status;

    console.log(responseValue.text, statusCode);
  }


  //The fact that the server responded is a success
  //Fetch throws an error - Rejected when then server doesn't respond

  //TODO: add another fetch here that goes to a fake website and see the Rejected error - can see in Networks tab
  const badResults = fetchResults.filter(
    r => r.status === "fulfilled" && r.value.ok === false
  );

  for (const response of badResults) {
    const responseValue = response.value.statusText;

    console.log(responseValue);
  }

}