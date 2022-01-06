//Used to sync slider and number amount.
const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');

const form = document.getElementById('passwordGeneratorForm')

if (characterAmountRange) {
    characterAmountRange.addEventListener('input', syncCharacterAmount);
}

if (characterAmountNumber) {
    characterAmountNumber.addEventListener('input', syncCharacterAmount);
}

function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}


//Function to generate the password and display it on the page.
function generatePassword() {

    let lowercaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let uppercaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let numberCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbolCharacters = ['!', '@', '#', '$', '&'];


    characterAmount = characterAmountNumber.value;

    let arrToUse = []
    let generatedStringPassword = "";

    if (!document.getElementById('lowercase').checked && !document.getElementById('uppercase').checked && !document.getElementById('numbers').checked && !document.getElementById('symbols').checked) {
        alert("You must at least select one checkbox to generate a password!");
    }

    else {

        if (document.getElementById('lowercase').checked) {

            for (let i = 0; i < lowercaseCharacters.length; i++) {
                arrToUse.push(lowercaseCharacters[i]);
            }
    
        }
    
    
        if (document.getElementById('uppercase').checked) {
    
            for (let i = 0; i < uppercaseCharacters.length; i++) {
                arrToUse.push(uppercaseCharacters[i]);
            }
    
        }
    
        if (document.getElementById('numbers').checked) {
            for (let i = 0; i < numberCharacters.length; i++) {
                arrToUse.push(numberCharacters[i]);
            }
        }
    
        if (document.getElementById('symbols').checked) {
            for (let i = 0; i < symbolCharacters.length; i++) {
                arrToUse.push(symbolCharacters[i]);
            }
        }
    
        console.log(lowercaseCharacters.length)
    
        let randomNumberGenerated = 0;
        for (let i = 0; i < characterAmount; i++) {
            
            randomNumberGenerated = Math.floor(Math.random() * (arrToUse.length - 0) + 0);
            generatedStringPassword += arrToUse[randomNumberGenerated];
        
        }
    
        console.log(generatedStringPassword);
    
        document.getElementById("password-display").value = generatedStringPassword;

    }
    
}

//Function to save the password to the mongo database.
function savePassword() {

    let nameOfWebsite = document.getElementById("websiteName").value;
    let passwordOfWebsite = document.getElementById("password-display").value;


    if (nameOfWebsite == "") {
        alert("Website name field is empty, you must provide a value.")
    }

    else if (passwordOfWebsite == "") {
        alert("Website password value is empty, a password must be generated")
    }

    else {
        
        const requestBody = {
            websiteName: nameOfWebsite,
            websitePassword: passwordOfWebsite
        }


        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if(this.readyState==4 && this.status==200){
                alert("Password Successfully Added!");
            }
            if(this.readyState==4 && this.status==401){
                alert("User already exists.");
            }
        }

        request.open("POST", "/pwgenerator", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(requestBody));
    }
}