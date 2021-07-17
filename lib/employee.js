//employee class
class employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
//info we are after in our generator
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "employee";
  }
}

module.exports = employee;
