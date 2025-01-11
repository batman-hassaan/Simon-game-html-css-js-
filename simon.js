let previousMoves = [];
let userMoves = [];
let colors = ["red", "blue", "green", "yellow"];
let score = 0;
let highest = 0;
let high = document.querySelector('.highest');

// Function to pick a random color and add it to the sequence
randcolor = () => {
    let pick;
    do {
        pick = colors[Math.floor(Math.random() * colors.length)];
    } while (previousMoves.length > 0 && pick === previousMoves[previousMoves.length - 1]); // Avoid repeating the last color

    previousMoves.push(pick); // Add the color to the sequence
    console.log("Sequence so far:", previousMoves);
};

// document.querySelector(".quit").addEventListener("click", () => {
//     if (gameRunning) {
//         gameRunning = false; // Stop the game
//         const finalScore = score - 1; // Adjust score (subtract the increment after the last correct guess)
//         document.querySelector(".result").innerHTML = `Game Over! Final Score: ${finalScore}`;
//         document.querySelector(".result").style.color = "#f0c674"; // Highlight result
//         resetGame();
//     }
// });

// // Function to reset game variables
// const resetGame = () => {
//     previousMoves = [];
//     userMoves = [];
//     score = 1; // Reset score
//     document.querySelector(".score").innerHTML = "Score: 0"; // Reset displayed score
// };

// Function to blink a picked color
colorpick = (picks, callback) => {
    let element;
    if (picks === "red") {
        element = document.querySelector(".red");
        element.style.backgroundColor = "red";
    } else if (picks === "blue") {
        element = document.querySelector(".blue");
        element.style.backgroundColor = "blue";
    } else if (picks === "green") {
        element = document.querySelector(".green");
        element.style.backgroundColor = "rgb(33, 241, 54)";
    } else if (picks === "yellow") {
        element = document.querySelector(".yellow");
        element.style.backgroundColor = "yellow";
    }

    // Add delay before resetting the color
    if (element) {
        setTimeout(() => {
            element.style.backgroundColor = ""; // Reset the color
            if (callback) callback(); // Call the callback after the blink effect
        }, 300); // Delay for the blink
    }
};

// Function to play the sequence of colors with a delay
// playSequence = () => {
//     for (let index = 0; index < 1; index++) {
//         randcolor(); // Add initial colors to the sequence
//     }
//     setTimeout(playSequence, 500);
// };
playSequence = () => {
    previousMoves.forEach((color, index) => {
        setTimeout(() => {
            colorpick(color);
        }, index * 1000); // Delay between each color
    });
};

// Add click event listeners to colors

// document.querySelector(".red").addEventListener("click", () => {
//     userMoves.push("red");
//     colorpick("red")
//     console.log("red");
//     usercheck();
// });
// document.querySelector(".green").addEventListener("click", () => {
//     userMoves.push("green");
//     colorpick("green")
//     console.log("green");
//     usercheck();
// });
// document.querySelector(".blue").addEventListener("click", () => {
//     userMoves.push("blue");
//     colorpick("blue")
//     console.log("blue");
//     usercheck();
// });
// document.querySelector(".yellow").addEventListener("click", () => {
//     userMoves.push("yellow");
//     colorpick("yellow")
//     console.log("yellow");
//     usercheck();
// });


document.querySelector(".red").addEventListener("click", () => {
    colorpick("red", () => { // Blink first, then process click
        userMoves.push("red");
        console.log("red");
        usercheck();
    });
});

document.querySelector(".green").addEventListener("click", () => {
    colorpick("green", () => {
        userMoves.push("green");
        console.log("green");
        usercheck();
    });
});

document.querySelector(".blue").addEventListener("click", () => {
    colorpick("blue", () => {
        userMoves.push("blue");
        console.log("blue");
        usercheck();
    });
});

document.querySelector(".yellow").addEventListener("click", () => {
    colorpick("yellow", () => {
        userMoves.push("yellow");
        console.log("yellow");
        usercheck();
    });
});

document.querySelector(".play-again").addEventListener("click", () => {
    // Reset game variables
    previousMoves = [];
    userMoves = [];
    score = 0;
    document.querySelector('.score').innerHTML = `Score : ${score}`;
    document.querySelector('.result').innerHTML = ""; // Clear result message
    document.querySelector('.highest').innerHTML = `Highest Score: ${highest}`; // Keep highest score intact

    // Start a new game
    playgame();
});


const usercheck = () => {
    for (let i = 0; i < userMoves.length; i++) {
        if (userMoves[i] !== previousMoves[i]) {
            // alert("Error! Wrong color clicked.");
            console.log("Error! Wrong color clicked.");
            if (score > highest) {
                highest = score;
            }
            document.querySelector('.highest').innerHTML = `Highest Score: ${highest}`;
            document.querySelector('.result').innerHTML = "Try Again";
            userMoves = [];
            score = 0;
            return;
        }
    }

    if (userMoves.length === previousMoves.length) {

        // alert("Correct! Get ready for the next round.");
        console.log("Correct! Get ready for the next round.");
        score++;
        document.querySelector('.score').innerHTML = `Score : ${score}`;
        document.querySelector('.result').innerHTML = "Correct";
        userMoves = [];
        setTimeout(() => {
            
            addNextMove()
        }, 2000);
    }
}


const addNextMove = () => {
    document.querySelector('.result').innerHTML = "";
    randcolor();
    setTimeout(playSequence, 1000);
};

playgame = () => {
    for (let index = 0; index < 1; index++) {
        randcolor();
    }
    setTimeout(playSequence, 500);
}

playgame()