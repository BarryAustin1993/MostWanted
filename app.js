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
      search(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}


// Menu function to call once you find who you are looking for
function mainMenu(people, person){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      break;
    case "family":
      searchFamily(people, person);
      break;
    case "descendants":
<<<<<<< HEAD
      getDescendants()
=======
      let descendants = getDescendants(people, person);
      displayPeople(descendants);
>>>>>>> 26e169f31e09dee1aca10557a2f25559dc399c35
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

//Needed ability to search by name & last name

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

    let filteredpeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });
  if (filteredpeople.length === 1){
    var person = filteredpeople[0];
    mainMenu(people, person);
  }
  else{
    mainMenu(people, filteredpeople);
  }
}

function search(people, filteredPeople){
  var trait = promptFor("What is a known trait to narrow the search? 'gender', 'dob', 'height','weight', 'eyeColor', 'occupation'", chars);
  var value = promptFor("What is the value of the known trait? example: if height = '71', eyeColor = 'brown'", chars);
  if(filteredPeople !== undefined){
    var filteredPeople = searchByTrait(filteredPeople, trait, value);
  }
  else{
    var filteredPeople = searchByTrait(people, trait, value);
  }

  continueSearchLoop(people, filteredPeople);
}

//Needed ability to search by trait
function searchByTrait(people, trait, value){

  var filteredPeople = people.filter(function(el) {
    if(el[trait] == value) {
      return el;
  }
});  
    if (filteredPeople.Length === 1){
    let person = filteredPeople[0];
    return person;
    }
    else{
    return filteredPeople;
    }
};

function continueSearchLoop(people, filteredPeople){
displayPeople(filteredPeople);
var searchType = promptFor("Did you find who you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      searchByName(people);
      break;
     
    case 'no':
      search(people, filteredPeople);
      break;
  }
}


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
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + " inches." + "\n";
  personInfo += "Weight: " + person.weight + " lbs." + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Former Occupation: " + person.occupation;
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

function searchFamily(people, person){
  var family = searchByTrait(people, "id", person.parents[0]);
  
  displayPeople(family);
}
 function getDescendants(people, person){
  var decendants = getChildren(people, person);
  decendants += getGrandChildren(people, decendants);


  return decendants;
 }



function getChildren(people, person) {
  var decendants = people.filter(function(el) {
    if(el.parents[0] === person.id || el.parents[1] === person.id){
      return true;
    }
          else{
      return false;
    }
  });
return decendants;
}

function getGrandChildren(people, decendants){

  for(let i = 0; i < decendants.length; i++){
    var futureDescendants = (getChildren(people, decendants[i]));
  }
  let combineddecendants = futureDescendants.concat(decendants)
return combineddecendants;

>>>>>>> 26e169f31e09dee1aca10557a2f25559dc399c35

}