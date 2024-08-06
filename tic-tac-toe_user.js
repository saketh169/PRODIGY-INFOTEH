let user1Score = 0;
let user2Score = 0;

let divs = document.querySelectorAll(".box");
let user1_msg = document.querySelector("#player1");
let user2_msg = document.querySelector("#player2");
let reset = document.querySelector("#reset");

let user1 = [];
let user2 = [];
let gameOver = false; // gameover flag
let currentPlayer = 1; // Track the current player

// Function to check the game outcome
function check_win(win) {
    console.log("          ");
    if (win === 'user1') {
        console.log("YOU WIN THE GAME");
        user1Score++;
        user1_msg.innerHTML = user1Score;
        gameOver = true;
    } else if (win === 'user2') {
        console.log("COMPUTER WINS THE GAME");
        user2Score++;
        user2_msg.innerHTML = user2Score;
        gameOver = true;
    } else {
        console.log("GAME IS DRAW");
    }
    console.log("User1 Score:", user1Score);
    console.log("User2 Score:", user2Score);
}

// Function to play the game and determine the result
function play_game(user1, user2) {
    let win = 'draw';

    // Check if user has a winning combination
    if (
        (user1.includes("one") && user1.includes("two") && user1.includes("three")) ||
        (user1.includes("four") && user1.includes("five") && user1.includes("six")) ||
        (user1.includes("seven") && user1.includes("eight") && user1.includes("nine")) ||
        (user1.includes("one") && user1.includes("four") && user1.includes("seven")) ||
        (user1.includes("two") && user1.includes("five") && user1.includes("eight")) ||
        (user1.includes("three") && user1.includes("six") && user1.includes("nine")) ||
        (user1.includes("one") && user1.includes("five") && user1.includes("nine")) ||
        (user1.includes("three") && user1.includes("five") && user1.includes("seven"))
    ) { win = 'user1';

    } else if (
        (user2.includes("one") && user2.includes("two") && user2.includes("three")) ||
        (user2.includes("four") && user2.includes("five") && user2.includes("six")) ||
        (user2.includes("seven") && user2.includes("eight") && user2.includes("nine")) ||
        (user2.includes("one") && user2.includes("four") && user2.includes("seven")) ||
        (user2.includes("two") && user2.includes("five") && user2.includes("eight")) ||
        (user2.includes("three") && user2.includes("six") && user2.includes("nine")) ||
        (user2.includes("one") && user2.includes("five") && user2.includes("nine")) ||
        (user2.includes("three") && user2.includes("five") && user2.includes("seven"))
    ) { win = 'user2';

    }

    if (win === 'user1' || win === 'user2' || win==='draw') {
        check_win(win);
    }
}

function createCircle(type) {
    let circle = document.createElement("div");
    circle.className = type;
    return circle;
}

function addCircleToDiv(div, type) {
    let existingCircle = div.querySelector(`.${type}`);
    if (!existingCircle) {
        let circle = createCircle(type);
        div.appendChild(circle);
    }
}

divs.forEach((div) => {
    div.addEventListener("click", () => {
        if (gameOver) return; // Prevent further moves if the game is over

        let userChoice = div.getAttribute("id");

        // Check if the div has already been chosen
        if (!user1.includes(userChoice) && !user2.includes(userChoice)) {
            if (currentPlayer === 1) {
                user1.push(userChoice);
                addCircleToDiv(div, "circle-user1");
                currentPlayer = 2;
            } else {
                user2.push(userChoice);
                addCircleToDiv(div, "circle-user2");
                currentPlayer = 1;
            }
            play_game(user1, user2);
        }
    });
});

reset.addEventListener("click", () => {
    gameOver = false;
    currentPlayer = 1;
    // Clear user and computer choices
    user1.length = 0;
    user2.length = 0;

    // Remove all circles
    divs.forEach(div => {
        let userCircle1 = div.querySelector(".circle-user1");
        let userCircle2 = div.querySelector(".circle-user2");
        if (userCircle1) {
            div.removeChild(userCircle1);
        }
        if (userCircle2) {
            div.removeChild(userCircle2);
        }

        // Re-enable the divs for selection
        div.style.pointerEvents = 'auto';
    });

    console.log("Game has been reset");
});


function goBack() {
    window.history.back();
}
