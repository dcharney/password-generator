// Assignment code here

// object to hold user responses to password prompts
var passwordCriteria = {
    //numCharacters: (must be between 8 and 128),
    //characterTypes: ["lowercase", "uppercase", "numeric", "special characters"],
}


var getNumCharacter = function() {
    var numCharacters = window.prompt("How many characters would you like your password to contain? (enter number between 8 and 128)");
    //loop function is user has not submitted an answer
    if (numCharacters === "" || numCharacters === null) {
        window.alert("You must enter a response to proceed");
        //loop function if user has not responded
        getNumCharacter()
    } else {
        //if an answer has been submitted, validate if it meets criteria
        numCharacters = parseInt(numCharacters);
        //check if num selected is within valid range
        if (numCharacters >= 8 && numCharacters <= 128) {
            console.log(numCharacters);
            return numCharacters;
        } else {
            window.alert("Invalid Response: Please make sure input is a numerical character between 8 and 128!");
            getNumCharacter();
        }
    }
};

var getCharacterType = function(type) {
    typeConfirmed = window.prompt("Would you like your password to include " + type + " characters? (y/n)")
    var boolConfirm = false;

    //loop function if user has not responded
    if (typeConfirmed === "" || typeConfirmed === null) {
        window.alert("You must enter a response to proceed");
        boolConfirm = getCharacterType(type)
    } else {
        //if user has responded, make sure entry is valid
        typeConfirmed = typeConfirmed.toLowerCase();
        if (typeConfirmed === "y" || typeConfirmed === "yes") {
            boolConfirm = true;
        } else if (typeConfirmed === "n" || typeConfirmed === "no") {
        } else {
            window.alert("Invalid Response: Please make sure you are entering y or n.");
            boolConfirm = getCharacterType(type);
        }
    }
    return boolConfirm
};


var getCharacterTypes = function() {
    var types = ["lowercase", "uppercase", "numeric", "special"]
    var typesConfirmed = [];
    for (i in types) {
        //debugger;
        // cycle through all 4 character types to ask user if desired
        typeConfirmation = getCharacterType(types[i]);
        if (typeConfirmation) {typesConfirmed.push(types[i])};
    }
    console.log(typesConfirmed);
    return typesConfirmed
}

var selectionMssg = function(criteria) {
    let alertMssg = "You have chosen to create a password that is ";
    alertMssg += criteria.numCharacters.toString();
    alertMssg += " characters long and contains ";
    if (criteria.characterTypes.length === 1) {
        alertMssg += criteria.characterTypes[0];
        alertMssg += " characters";
    } else {
        for (n = 0; n < criteria.characterTypes.length; n++) {
            if (n === (criteria.characterTypes.length - 1)) {
                alertMssg += ", and ";
            } else if (n != 0) {
                alertMssg += ", ";
            }
            alertMssg += criteria.characterTypes[n];
            alertMssg += " characters";
        }
    };
    alertMssg += ".";
    window.alert(alertMssg);
};

var passwordCreator = function(criteria) {
    let str = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const special = " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"
    for (i = 0; i < criteria.numCharacters; i++) {
        //determine character type
        type = criteria.characterTypes[Math.floor(Math.random()*criteria.characterTypes.length)];
        //assign character based on selected type
        switch (type) {
            case "lowercase":
                //generate lowercase character
                lowChar = alphabet[Math.floor(Math.random()*alphabet.length)];
                str += lowChar;
                break;
            case "uppercase":
                //generate uppercase character
                uppChar = alphabet[Math.floor(Math.random()*alphabet.length)];
                str += uppChar.toUpperCase();
                break;
            case "numeric":
                //generate random number between 0 & 9
                numChar = Math.floor(Math.random()*10);
                str += numChar.toString();
                break;
            case "special":
                //generate lowercase character
                spChar = special[Math.floor(Math.random()*special.length)];
                str += spChar;
                break;
        }
    }
    return str
};

var generatePassword = function() {
    passwordCriteria.numCharacters = getNumCharacter();
    passwordCriteria.characterTypes = getCharacterTypes();
    while (passwordCriteria.characterTypes.length === 0) {
        window.alert("ERROR: You have chosen no character types. This is not possible. Selection process will be repeated.")
        passwordCriteria.characterTypes = getCharacterTypes();
    }
    console.log(passwordCriteria.characterTypes);
    // show the user what they have selected
    selectionMssg(passwordCriteria);
    //generate the password
    debugger;
    password = passwordCreator(passwordCriteria);

    return password
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
