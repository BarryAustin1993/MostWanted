/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      searchByName(people);
      break;
    case 'no':
      searchByTraits();
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}


function searchByTraits(){
  var userInputeNumberOfTraits = promptFor("How many traits would you like to compare?", chars)

  switch(userInputeNumberOfTraits){
    case "1":
    case "one":
      let intOfTraits = 1;
      pickTheTraits(intOfTraits);
    break;

  }
}

function pickTheTraits(intOfTraits){
  for ( i = 0; i < intOfTraits; i++ ){
    var listoftraits = promptFor("Which Trait(s) would you like to filter by? Options: Gender, Date of Birth, Height, Weight, eyeColor, Occupation, Parents, Current Spouse", chars);
  }
  
}


//Needed ability to search by name & last name

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
    else{
        alert("Could not find that individual.");
        return app(people); // restart
    }
  });
}

//Needed ability to search by gender
function searchByGender(people){
  var gender = promptFor("what is the person's gender?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.gender === gender) {
      return el;
    }
  });  
}

//Needed ability to search by DOB
function searchByGender(people){
  var dob = promptFor("What is the person's date of birth?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.dob === dob) {
      return el;
    }
  });  
}

//Needed ability to search by height
function searchByHeight(people){
  var height = promptFor("What is the person's height?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.height === height) {
      return el;
    }
  });  
}

//Needed ability to search by weight
function searchByWeight(people){
  var weight = promptFor("What is the person's weight?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.weight === weight) {
      return el;
    }
  });  
}

//Needed ability to search by eye color
function searchByEyeColor(people){
  var eyeColor = promptFor("What is the person's eye color?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.eyeColor === eyeColor) {
      return el;
    }
  });  
}

//Needed ability to search by occupation
function searchByOccupation(people){
  var occupation = promptFor("What is the person's occupation?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.occupation === occupation) {
      return el;
    }
  });  
}

//Needed ability to search by parents
function searchByParents(people){
  var parents = promptFor("Who are the person's parents?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el[parents]=== parents) {
      return el;
    }
  });  
}

//Needed ability to search by current spouse
function searchByCurrentSpouse(people){
  var currentSpouse = promptFor("Who is the person's current spouse?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.currentSpouse === currentSpouse) {
      return el;
    }
  });  
}

  // TODO: What to do with filteredPeople?



// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}