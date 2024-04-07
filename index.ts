import inquirer from "inquirer";

let myBalance: number = 100000;
let myPin: number = 5432;

async function main() {
  let pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      type: "number",
      message: "Enter pin: ",
    },
  ]);

  if (pinAnswer.pin === myPin) {
    console.log("Correct pin");

    let operationAnswer = await inquirer.prompt([
      {
        name: "operations",
        type: "list",
        message: "Choose Options: ",
        choices: ["withdraw", "check balance", "fast cash"],
      },
    ]);

    if (operationAnswer.operations === "withdraw") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: "Enter amount: ",
        },
      ]);

      if (amountAns.amount > myBalance) {
        console.log("Insufficient balance. Please enter an amount less than or equal to your current balance.");
      } else {
        myBalance -= amountAns.amount;
        console.log(`Your remaining balance is:${myBalance}`);
      }
    } else if (operationAnswer.operations === "check balance") {
      console.log(`Your current balance is: ${myBalance}`);
    } else if (operationAnswer.operations === "fast cash") {
      let fastAns = await inquirer.prompt([
        {
          name: "fast", 
          message: "Choose the option if you want to withdraw this amount",
          type: "list",
          choices: [10000, 25000, 50000, 100000],
        },
      ]);


      const chosenAmount = Number(fastAns.fast); 

      if (chosenAmount > myBalance) {
        console.log("Insufficient balance. Please choose a smaller amount.");
      } else {
        myBalance -= chosenAmount;
        console.log(
          `You have withdrawn ${chosenAmount}. Your remaining balance is: ${myBalance}`
        );
      }
    }
  } else {
    console.log("Incorrect pin");
  }
}

main();
