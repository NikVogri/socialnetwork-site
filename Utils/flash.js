class Flash {
  constructor(type, message, req) {
    this.type = type;
    this.message = message;
  }

  create(type, message) {
    req.session.message = {
      type,
      message
    };
  }
}

module.exports = new Flash();
