//classes we brought over to create our generator
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
//packages and file paths we need to generate our CLI
const fs = require("fs");
const inquirer = require("inquirer");
const genFilePath = "./dist/profile.html";
const figlet = require("figlet");
const chalk = require("chalk");
const log = console.log;

//empty array to store user generated content
let staff = [];

//figlet line to generate our CLI title, coloured blue with chalk
log(
  chalk.blue(
    figlet.textSync("Team Profile Generator", { horizontalLayout: "full" })
  )
);
//prompts generating manager information
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
  //generating the new manager
  .then((answers) => {
    let manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerOffNum
    );
  //pushing the manager to staff array
    staff.push(manager);
  //validating if user wants to add more staff then running the subsequent function for the staff class they user chose
    if (answers.moreStaff === "Intern") {
      addIntern();
    } else if (answers.moreStaff === "Engineer") {
      addEngineer();
    } else {
    //if user is done generating staff cards run function to end the prompts and generate the markup
      log("Roster complete, please Navigate to the profile page")
      EndofPrompts();
    }
  });

//intern prompts to generate an intern staff card
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
    //generating new intern
    .then((answers) => {
      let intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
    //pushing intern to staff array
      staff.push(intern);
    //validating if user needs to add more staff cards and then running the appropriate function
      if (answers.moreStaff === "Intern") {
        addIntern();
      } else if (answers.moreStaff === "Engineer") {
        addEngineer();
      } else {
      //if user is done adding staff stopping the prompts and generating page markup
        log("Roster complete, please Navigate to the profile page")
        EndofPrompts();
      }
    });
}

//function to generate a new engineer card based of user prompts
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
        name: "engineerGitHub",
      },
      {
        type: "list",
        message: "Would you like to add a team member?  Select the role below.",
        choices: ["Engineer", "Intern", "Exit"],
        name: "moreStaff",
      },
    ])
    .then((answers) => {
      //generating new engineer
      let engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGitHub
      );
      //pushing engineer to staff array
      staff.push(engineer);
      // validating if user needs more staff and then running the appropriate function
      if (answers.moreStaff === "Intern") {
        addIntern();
      } else if (answers.moreStaff === "Engineer") {
        addEngineer();
      } else {
      //when user is done generating staff stops prompts and generates page markup
        log("Roster complete, please Navigate to the profile page")
        EndofPrompts();
      }
    });
}

//generates the basic markup for the profile page
function genStartHtml() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  
  
      <title>Team Profile</title>
      <link rel="stylesheet" href ="./profile.css">
  </head>
  <body>
      <div class="head">
      <h1>Team Profile</h1>
      </div>
      <div class = "page-box">`;
}

//this function generates the unique line in the card specific to each class
 function specInfo(staff) {
   if (staff.getRole() === "Manager") {
     return ` <li class = "list-group-item">Office Number: ${staff.getOffNum()}</li>`;
   } else if (staff.getRole() === "Intern") {
     return `<li class = "list-group-item">School: ${staff.getSchool()} </li>`;
  } else {
     return ` <li class = "list-group-item">GitHub: <a href = "www.github.com/${staff.getGithub()}">${staff.getGithub()}</a></li>`;
   }
 }

//generates the staff card markup
function staffHtml(staff) 
{
  return `
  <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${staff.getName()}</h5>
            <p class="card-text">${staff.getRole()}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Employee Id:${staff.getId()}</li>
            <li class="list-group-item">Email Address: <a href = "mailto:${staff.getEmail()}">${staff.getEmail()}</a></li>
            ${specInfo(staff)}
          </ul>
        </div>
  `
}

//generates the last of the markup to build the page
function genFinalHtml() {
  ` </div>  

  </body>
  </html`;
}

//this function writes and generates the finished product
function EndofPrompts() {
  fs.writeFileSync(genFilePath, "");
  let markupData = genStartHtml();

  for (var a in staff) {
    markupData += staffHtml(staff[a]);
  }
  markupData += genFinalHtml();
  fs.writeFileSync(genFilePath, markupData);

  }