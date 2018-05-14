const express = require('express');
const randomItem = require('random-item');
const app = express();

const choices = ['rock', 'paper', 'scissors'];
const results = ['Égalité !', 'Gagné !', 'Perdu !'];

app.set('view engine', 'pug');
app.set("views", "public/views");
app.use(express.static("public"));

function compareChoices(userChoice, computerChoice) {
    let result;

    if(userChoice == computerChoice) {
        result = results[0];
    } else if(userChoice == "rock" && computerChoice == "paper") {
        result = results[2];
    } else if(userChoice == "paper" && computerChoice == "rock") {
        result = results[1];
    } else if(userChoice == "scissors" && computerChoice == "rock") {
        result = results[2];
    } else if(userChoice == "rock" && computerChoice == "scissors") {
        result = results[1];
    } else if(userChoice == "paper" && computerChoice == "scissors") {
        result = results[2];
    } else if(userChoice == "scissors" && computerChoice == "paper") {
        result = results[1];
    }

    return result;
}

app.get('/:choice*?', (req, res) => {
    let userChoice = req.params.choice;

    if(choices.includes(userChoice)) {
        let computerChoice = randomItem(choices);
        res.render('choice', {
            user: userChoice,
            computer: computerChoice,
            result: compareChoices(userChoice, computerChoice)
        });
    } else {
        res.render('index', { choiceList: choices });
    }
});

app.listen(3000);
