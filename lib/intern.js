const employee = require("./employee");

//the intern class extended from employee
class Intern extends employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
//info we need that is intern specific
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }

}

module.exports = Intern;
