///////////////
// Introduction
//////////////

// https://github.com/McKmillions
// https://www.linkedin.com/in/zacharymckimmins


///////////////
// Callbacks
//////////////

// we can pass a function as an argument in another function and later execute that passed-in function or even return it to be executed later. This is the essence of using callback functions in JavaScript.

// Callbacks are funky: function being passed in as parameters and we use that function inside of the other function.

// A callback function is:
// is also known as a higher-order function
// is a function passed to another function
// is essentially a pattern and can also be known as a callback pattern

// We can pass functions around like variables and return them in functions and use them in other functions.

// When you pass a callback as an argument to another invoked function we are only passing the function definition. NOT executing the function

// Note that the callback function is not executed immediately. It is “called back” (hence the name) at some specified point inside the containing function’s body.

/////////////
// Intro Example
////////////

function sayHello( name ) {
  console.log( "Hello" + name );
} // creating/declaring a function

sayHello( "Zach" ); // invoking a function

////////////////////////////////////////////////////////////////////
// Example to switch out greeting based on language using Callbacks
///////////////////////////////////////////////////////////////////

function sayHello( name, greeting ) {
  console.log( greeting() + ', ' + name );
} // you can invoke the function inside the function. sayHello is a higher order function
// separating the how & the what. with this example it's separating the language decision from the code that actually does the greeting

function englishGreeting() {
  return "Cheerio";
}

function spanishGreeting() {
  return "Hola";
}

function frenchGreeting() {
  return "Bonjour";
}

sayHello( "Zach", englishGreeting); //invoking a function and passing in englishGreeting as an argument

// this is a contrived example and only to show that we can pass in a function within a function


///////////////////////////////////////////////////
// Another way to simplify callbacks with language
//////////////////////////////////////////////////

var translate = function( msg, cb ) {
  if ( msg === 'Hello' ) {
    cb('Hola');
  }
}

// Now pass in two arguments in the invoked function below
translate( "Hello", function( translated_msg ) {
  console.log(translated_msg);
})


////////////////////
// Real World Ex 1
///////////////////

// Let's right a function that will sum an array
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];


// my solution (a reusable function)
function loopArr( arr ) {
	var sum = 0;
	for(var i = 0; i < arr.length; i++) {
    // console.log(ary[i]); // start out with something simple
		sum += arr[i];
	}
	return sum
}

loopArr(nums); // = 45

var arrayOfStrings = ['Spiderman', 'Wolverine', 'Magneto'];

loopArr(arrayOfStrings); // loopArr can't sum up strings!

// were iterating and acumulating over the array to collect the sum (Which is two very different things)

// loopArr isn't a very explicity name it's a very broad description and so we should build it like that.

// we can break out how were iterating over the array with what were doing over the array. And also make the function much more reusable.

// The way we do that is pass it a function as a parameter.

//////////////////////////////////////////////////////////////////
// Real World Ex 1 Extended (Add action as a parameter to loopArr)
/////////////////////////////////////////////////////////////////

function loopArr( arr, action ) {
	for(var i = 0; i < arr.length; i++) {
    // console.log(ary[i]); // start out with something simple
		action(arr[i]); // invoke the function and pass in the current element in the array
	}
}

// loopArr(nums); // = 45

var arrayOfStrings = ['Spiderman', 'Wolverine', 'Magneto'];

loopArr(arrayOfStrings, function( hero ) {
  console.log(hero);
});

// to sum a array using loopArr
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var total = 0;

// loopArr has two arguments
// num & a anonymous function that will be passed in as a parameter called action into loopArr

loopArr( nums, function( num ) { // we don't invoke this function. everytime we loop inside loopArr it get's invoked!
  total = total + num;
})
console.log(total);

// Note: this is a new concept. the more you use it the more you'll get more familiar with it.


//////////////////////////////////////////////////
// Another Example (player gets hit several times)
//////////////////////////////////////////////////

function loopArr( arr, action ) {
	for(var i = 0; i < arr.length; i++) {
    action(arr[i]);
	}
}

var player = {
  health: 100,
  hits:
  [
    { location: 'leg', damage: 10 },
    { location: 'arm', damage: 15 },
    { location: 'body', damage: 45 }
  ],
  calculateHealth: function () {
    loopArr(this.hits, function ( hit ) {
    	this.health -= hit.damage;
    }.bind(this)); // this function gets invoked in loopArr. this. is referring to the window and won't work since it's getting invoked somewhere else. callback hell. this bind and apply. this.hits is fine and works
  }
}

player.calculateHealth();
console.log(player.health);

//bind binds this to a particular object. it returns a copy of the function to be invoked later

/////////////////////////////
// Asyncronous vs Syncronous
////////////////////////////

// Javascript starts at the top of our files and starts evaluating our statements and expressions it waits for that function to finish what it's doing and then moves on to the next.

// If a function loops through 100million times it's going to slow the whole app down. This is Syncronous. 1x1 it waits for each line to finish

// The better approach is Asyncronous. If something is going to take a long time then Asyncronous. Like, Go do this when your done let me know.

// How does Asyncronous let you know when it's done? It invokes the function. When your done invoke this function.

// That's why we call it a callback. It's going to do something Asyncronously.

// When it's done its going to invoke this function. It's more efficient. A better user experience. A browser doesn't lock up, etc.

// Disadvantage is the code doesn't follow a linear path functions can execute somewhere else. Sometimes hard to follow code.

//Some functions are by default Asyncronous (setTimeout)

console.log('Start');

setTimeout(function() {
  console.log("Middle");
}, 5000) // hey after 5 seconds I need to come back and invoke this function

console.log('End');

// Javascript will run all the code together at once and will run start end all at once

// Another way to do Asyncronous Callbacks

////////////////////
// Asyncronous Ex 1
///////////////////

var msg1 = "Hi";

setTimeout( function() {
	console.log("times up");
	msg1 = "bye";
	console.log(msg1);
})

console.log(msg1);


////////////////////
// Asyncronous Ex 2
///////////////////

var msg2 = "Hi!";

var doStuff = function() {
  console.log("times up");
  msg2 = "bye";

}
console.log(msg2)

setTimeout( doStuff(), 2,000 );

console.log(msg2);

// Waits for the user to click something and then the alert happens using a callbacks

// Callbacks are used in Asyncronous functions

// Most of the stuff we do in javascript is Syncronous

// When you start doing calls to databases to get data back is Asyncronous

// or when you click a button and it fires off a function

/////////////////////////
// Button Click Event Ex
////////////////////////

button.on('click', function( event ) {
  alert("hello");
})

////////////////////////////////////////////
// Rebuild reduce prototype with callbacks
///////////////////////////////////////////
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var arr2 = [
  { val: 1 },
  { val: 2 },
  { val: 3 },
  { val: 4 },
  { val: 5 },
  { val: 6 },
  { val: 7 },
  { val: 8 },
  { val: 9 },
]

function reduce( arr, reducer ) {
  var sum = 0;
  for( var i = 0; i < arr.length; i++ ) {
    sum = reducer( sum, arr[i] );
  }
  return sum;
}

function numberReducer( prev, curr ) {
	return prev + curr;
}

function objectReducer( prev, curr ) {
	return prev + curr.val; // curr is an object we need the val property
}

var total = reduce(arr1, numberReducer);
console.log("arr1 =", total);
var total2 = reduce(arr2, objectReducer);
console.log("arr2 =", total2);

////////////////
// Ending Notes
////////////////

// you should look at your own code for opportunities to use callback functions, for they will allow you to:

// Do not repeat code (DRY—Do Not Repeat Yourself)
// Implement better abstraction where you can have more generic functions that are versatile (can handle all sorts of functionalities)
// Have better maintainability
// You can save yourself time by using callbacks
// For asynchronous execution (such as reading files, and making HTTP requests)
// In Event Listeners/Handlers (buttons)
// In setTimeout and setInterval methods
