module.exports = class CustomeError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }

  static userExist(message = "User is Already Exist!", status = 404) {
    return new CustomeError(message, status);
  }

  static notMatch(message = "Email Or Password is incorrect!", status = 409) {
    return new CustomeError(message, status);
  }

  static unAuthorize(message = "invalid token!", status = 409) {
    return new CustomeError(message, status);
  }

  static NotFound(message = "Glass Not Found", status = 404) {
    return new CustomeError(message, status);
  }
};
