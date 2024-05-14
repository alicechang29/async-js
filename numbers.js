"use strict";

const BASE_URL = "http://numbersapi.com";

//http://numbersapi.com/random/year?json

/**Gets trivia about favorite number from numbers api and
 * console logs the result */
async function showNumberTrivia(faveNum) {

  const response = await fetch(`${BASE_URL}/${faveNum}?json`);

  const jsonResult = await response.json();
  //first await all of the json.

  console.log("jsonResult", jsonResult);

  console.log(jsonResult.text);
  //once jsonResult is an object, then we can access the key

}

/**Gets trivia about any of the numbers listed, and
 * console logs the first response from numbers api */
async function showNumberRace(nums) {

  // for every num within nums, returns a promise
  // .map puts things into an array
  // since async fns only return promises, need to await the response
  const responsePromises = nums.map(n => fetch(`${BASE_URL}/${n}?json`));

  console.log(responsePromises); //[Promise, Promise, Promise]

  //now that i have a promise for each num fetch, i need to await the winner
  const winningResponse = await Promise.race(responsePromises);
  // this will return 1 response object of whatever data returns first


  //now that i have the response object, i can access the status codes, etc.
  //to get the data, i need to await and call .json() on it to parse the data
  const winningData = await winningResponse.json();

  //now i can access the parsed data and get values out of the object.
  console.log(winningData.text);
}


async function showNumberAll(nums) {

  //array of promises, one for each num in nums
  const responsePromise = nums.map(n => fetch(`${BASE_URL}/${n}?json`));


  // Promise.allSettled returns a single promise
  // awaiting Promise.allSettled returns a list of objects
  const fetchResults = await Promise.allSettled(responsePromise);

  //now filter through the responses to find responses that are successful

  const successResults = fetchResults.filter(
    r => r.status === "fulfilled" && r.value.ok === true
  );

  // now get the response value out
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
/**Makes calls in sequence  */
async function main() {
  await showNumberTrivia(20);
  await showNumberRace([1, 2, 3]);
  await showNumberAll([4, 5, 6]);

}

main();