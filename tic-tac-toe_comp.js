let userscore = 0;
let compscore = 0;

let divs = document.querySelectorAll(".box");
let user_msg=document.querySelector("#user-score");
let comp_msg=document.querySelector("#comp-score");
let reset=document.querySelector("#reset");

let user = [];
let comp = [];
let gameOver = false; // gameover flag

function comp_input() {
    let options = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let availableOptions = options.filter(option => !user.includes(option) && !comp.includes(option));

    if (availableOptions.length == 0) {
        play_game(user, comp);
        return null;
    }

    // Check for winning move for computer
    for (let option of availableOptions) {
        comp.push(option);
        if (play_game(user, comp, true) === 'comp') {
            return option;
        }
        comp.pop();
    }

    // Check for blocking move for user
    for (let option of availableOptions) {
        user.push(option);
        if (play_game(user, comp, true) === 'user') {
            user.pop();
            comp.push(option);
            return option;
        }
        user.pop();
    }

    let data = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    comp.push(data);
    return data;
}


// Function to check the game outcome
function check_win(win) {
    console.log("          ");
    if (win==='user') {
        console.log("YOU WIN THE GAME");
        userscore++;
        user_msg.innerHTML=userscore;
        gameOver = true;
    }else if(win==='comp'){
        console.log("COMPUTER WINS THE GAME");
        compscore++;
        comp_msg.innerHTML=compscore;
        gameOver = true;
    }else{
        console.log("GAME IS DRAW");
    }
    console.log("User Score:", userscore);
    console.log("Computer Score:", compscore);
}

// The checkOnly parameter is used to perform a check without making permanent changes or triggering additional actions.
/* checkOnly parameter, true and false determine whether the function should perform a full check (including updates to the game state) or a simulation check only. Here’s what each means:

true (checkOnly mode):

The function checks for a winning combination but does not update the game state.
Used to simulate potential moves without making permanent changes (like incrementing scores or setting the game as over).

false (default mode):

The function performs the check and updates the game state accordingly.
If a winning combination is found, it updates the scores, sets the game as over, and prints the results.
// Function to play the game and determine the result
*/
function play_game(user, comp, checkOnly = false) {
    let win = 'draw';

    if (
        (user.includes("one") && user.includes("two") && user.includes("three")) ||
        (user.includes("four") && user.includes("five") && user.includes("six")) ||
        (user.includes("seven") && user.includes("eight") && user.includes("nine")) ||
        (user.includes("one") && user.includes("four") && user.includes("seven")) ||
        (user.includes("two") && user.includes("five") && user.includes("eight")) ||
        (user.includes("three") && user.includes("six") && user.includes("nine")) ||
        (user.includes("one") && user.includes("five") && user.includes("nine")) ||
        (user.includes("three") && user.includes("five") && user.includes("seven"))
    ) {
        win = 'user';
    } else if (
        (comp.includes("one") && comp.includes("two") && comp.includes("three")) ||
        (comp.includes("four") && comp.includes("five") && comp.includes("six")) ||
        (comp.includes("seven") && comp.includes("eight") && comp.includes("nine")) ||
        (comp.includes("one") && comp.includes("four") && comp.includes("seven")) ||
        (comp.includes("two") && comp.includes("five") && comp.includes("eight")) ||
        (comp.includes("three") && comp.includes("six") && comp.includes("nine")) ||
        (comp.includes("one") && comp.includes("five") && comp.includes("nine")) ||
        (comp.includes("three") && comp.includes("five") && comp.includes("seven"))
    ) {
        win = 'comp';
    }

    if (checkOnly) {  // win value changes based on above if - else
        return win;
    }

    check_win(win);
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

function get_choices(userchoice) {

    if (gameOver) return; // Prevent further moves if the game is over
    let userinput = userchoice;
    let compinput = comp_input(userchoice);

    let userDiv = document.getElementById(userinput);
    addCircleToDiv(userDiv, "circle-user");

    if (compinput) { // doesnt create circle when there are no imputs
        setTimeout(() => { // Delay the computer's move by 1 second
            let compDiv = document.getElementById(compinput);
            addCircleToDiv(compDiv, "circle-comp");

            console.log(userinput);
            console.log(compinput);
            console.log("          "); 
        }, 500);

        
        console.log("user:", user);
        console.log("comp:", comp);
        console.log("           ");
        play_game(user, comp);
    }
    
}

divs.forEach((div) => {
    div.addEventListener("click", () => {
        if (gameOver) return; // Prevent further moves if the game is over

        let userchoice = div.getAttribute("id");
        
        // Check if the div has already been chosen
        if (!user.includes(userchoice) && !comp.includes(userchoice)) {
            user.push(userchoice);
            get_choices(userchoice);
        }
    });
});


reset.addEventListener("click",()=>{
  
  gameOver = false;
  // Clear user and computer choices
  user.length = 0;
  comp.length = 0;

  // Remove all circles
  divs.forEach(div => {
      let userCircle = div.querySelector(".circle-user");
      let compCircle = div.querySelector(".circle-comp");
      if (userCircle) {
          div.removeChild(userCircle);
      }
      if (compCircle) {
          div.removeChild(compCircle);
      }

      // Re-enable the divs for selection
      div.style.pointerEvents = 'auto';
  });

  console.log("Game has been reset");

});

function goBack() {
    window.history.back();
}