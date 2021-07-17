//manager class extended from employee
const employee = require("./employee");

class Manager extends employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
//manager specific info we need for the generator
  getOffNum() {
    return this.officeNumber;
  }
  getRole() {
    return "Manager";
  }
  }


module.exports = Manager;


