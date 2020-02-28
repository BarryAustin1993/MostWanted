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
      displayPerson(people, person);
      break;
    case "family":
      searchFamily(people, person);
      break;
    case "descendants":
      getDescendants(people, person);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(people, person); // ask again
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

function displayPerson(people, person){
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
  mainMenu(people, person);
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
  searchSpouse(people, person);
  getChildren(people, person, true);
  let parents = searchParents(people, person);
  if (parents.length > 0){
    searchSiblings(people, person, parents)
  }
  else{
    alert("There is no parents, so they have no siblings!")
  }
  
  mainMenu(people, person);
}
function searchSpouse(people, person){
  var spouse = searchByTrait(people, "id", person.currentSpouse);
  if(spouse.length !== 0){
    alert("Spouse: \n" + spouse[0].firstName + " " + spouse[0].lastName)
  }
  else{
    alert("There is no spouse!")
  }
}
function searchParents(people, person){
  var parents = people.filter(function(el) {
    if(person.parents[0] === el.id || person.parents[1] === el.id){
      return true;
    }
          else{
      return false;
    }
  });
  if(parents.length !== 0){
  alert("The parents are: " +
    parents.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));}
  else{
    alert("This is Batman!")
  }
  return parents;
}
function searchSiblings(people, person, parents){
  for( i =0; i < parents.length; i ++){
    var allChildren = getChildren(people, parents[i])
  }
  var siblings = removeSelf(person, allChildren)

  if(siblings.length !== 0){
  alert("The siblings are: " +
  siblings.map(function(person){
  return person.firstName + " " + person.lastName;
}).join("\n"));
}
else{
  alert("This person is an only child!")
}
}
function removeSelf(person, allChildren ){
var siblings = allChildren.filter(function(el){
  if(el.id !== person.id){
    return el;
  }
});
return siblings;
}
 function getDescendants(people, person){
  var decendants = getChildren(people, person);
  getGrandChildren(people, decendants);
  mainMenu(people, person)
}
function getChildren(people, person, showchildren) {
  var decendants = people.filter(function(el) {
    if(el.parents[0] === person.id || el.parents[1] === person.id){
      return true;
    }
          else{
      return false;
    }
  });
if(showchildren === true){
  if(decendants.length !== 0){
    alert("The children are: " +
    decendants.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
  else{
    alert("This person has no children!")
  }
}
return decendants;
}


function getGrandChildren(people, decendants){
  for(let i = 0; i < decendants.length; i++){
    var futureDescendants = (getChildren(people, decendants[i], false));
  }
  if( futureDescendants !== undefined){
  var combineddecendants = futureDescendants.concat(decendants);
}
  if(combineddecendants !== undefined){
    alert("The future generations are: \n" +
    combineddecendants.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  }
  else{
    alert("This person has no further decendants")
  }
}