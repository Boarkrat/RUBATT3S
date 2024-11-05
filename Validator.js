class Validator {
    string() {
      return {
        isValid(value) {
          return typeof value === 'string';
        },
      };
    }
  
    email() {
      return new EmailValidator();
    }
  
    age() {
      return new AgeValidator();
    }
  
    user() {
      return new UserValidator();
    }
  }
  
  class EmailValidator {
    constructor() {
      this.minLength = null;
      this.maxLength = null;
    }
  
    isValid(value) {
      if (typeof value !== 'string' || !value.includes('@')) return false;
  
      const localPart = value.split('@')[0];
      if (this.minLength && localPart.length < this.minLength) return false;
      if (this.maxLength && localPart.length > this.maxLength) return false;
  
      return true;
    }
  
    setEmailLengthConstraint(minLength, maxLength = null) {
      this.minLength = minLength;
      this.maxLength = maxLength;
      return this;
    }
  }
  
  class AgeValidator {
    constructor() {
      this.requireAdult = false;
    }
  
    isValid(value) {
      if (typeof value !== 'number' || value < 0) return false;
      if (this.requireAdult && value < 18) return false;
      return true;
    }
  
    isAdult() {
      this.requireAdult = true;
      return this;
    }
  }
  
  class UserValidator {
    constructor() {
      this.fields = {};
    }
  
    shape(fields) {
      this.fields = fields;
      return this;
    }
  
    isValid(data) {
      for (const key in this.fields) {
        const validator = this.fields[key];
        if (!validator.isValid(data[key])) {
          return false;
        }
      }
      return true;
    }
  }
  
  export default Validator; // измените export на export default
  