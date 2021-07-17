//engineer class extended from employee
const employee = require("./employee");

class Engineer extends employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
//engineer specific info we need for the generator
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }

}

module.exports = Engineer;
