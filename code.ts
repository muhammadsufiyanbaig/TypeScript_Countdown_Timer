import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import player from "play-sound";

const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please enter the amount of seconds",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter a valid number";
        } else if (input > 60) {
            return `You can't input more than 60 seconds`;
        } else {
            return true;
        }
    }
});

const input = res.userInput;

function startTime(val: number) {
    const soundPlayer = player(); // Create a new instance of the player
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            soundPlayer.play("path/to/beep.mp3", (err: any) => {
                if (err) {
                    console.error("Error occurred while playing beep sound:", err);
                }
            });
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}

startTime(input);
