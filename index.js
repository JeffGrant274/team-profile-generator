const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const fs = require("fs");
const inquirer = require("inquirer");
const genFilePath = "./dist/profile.html";
const figlet = require("figlet");
const chalk = require("chalk");
const log = console.log;

let staff = [];

log(
  chalk.blue(
    figlet.textSync("Team Profile Generator", { horizontalLayout: "full" })
  )
);
// TODO: Create an array of questions for user input
inquirer
  .prompt([
    {
      type: "input",
      message: "Please Enter a managers name?",
      name: "managerName",
    },
    {
      type: "input",
      message: "Please enter their employee ID",
      name: "managerId",
    },
    {
      type: "input",
      message: "Please enter their email address",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "Please enteir their office number",
      name: "managerOffNum",
    },
    {
      type: "list",
      message: "Would you like to add a team member?  Select the role below.",
      choices: ["Engineer", "Intern", "Exit"],
      name: "moreStaff",
    },
  ])
  .then((answers) => {
    let manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerOffNum
    );
    staff.push(manager);
    if (answers.moreStaff === "Intern") {
      addIntern();
    } else if (answers.moreStaff === "Engineer") {
      addEngineer();
    } else {
      EndofPrompts();
    }
  });

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please Enter an intern's name?",
        name: "internName",
      },
      {
        type: "input",
        message: "Please enter their employee ID",
        name: "internId",
      },
      {
        type: "input",
        message: "Please enter their email address",
        name: "internEmail",
      },
      {
        type: "input",
        message: "Please enteir their school",
        name: "internSchool",
      },
      {
        type: "list",
        message: "Would you like to add a team member?  Select the role below.",
        choices: ["Engineer", "Intern", "Exit"],
        name: "moreStaff",
      },
    ])
    .then((answers) => {
      let intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      staff.push(intern);
      if (answers.moreStaff === "Intern") {
        addIntern();
      } else if (answers.moreStaff === "Engineer") {
        addEngineer();
      } else {
        EndofPrompts();
      }
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please Enter an engineer's name?",
        name: "engineerName",
      },
      {
        type: "input",
        message: "Please enter their employee ID",
        name: "engineerId",
      },
      {
        type: "input",
        message: "Please enter their email address",
        name: "engineerEmail",
      },
      {
        type: "input",
        message: "Please enter their Github username",
        name: "enginnerGitHub",
      },
      {
        type: "list",
        message: "Would you like to add a team member?  Select the role below.",
        choices: ["Engineer", "Intern", "Exit"],
        name: "moreStaff",
      },
    ])
    .then((answers) => {
      let engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.internSchool
      );
      staff.push(engineer);
      if (answers.moreStaff === "Intern") {
        addIntern();
      } else if (answers.moreStaff === "Engineer") {
        addEngineer();
      } else {
        EndofPrompts();
      }
    });
}

function EndofPrompts() {
  fs.writeFileSync(genFilePath, "");
}
