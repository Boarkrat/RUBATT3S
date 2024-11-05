import Validator from './Validator.js';

// Пример проверки email
const v = new Validator();
const emailSchema = v.email().setEmailLengthConstraint(5, 10);

console.log(emailSchema.isValid('Hello@protonmail.com')); // false (слишком длинный)
console.log(emailSchema.isValid('Short@y.com')); // false (слишком короткий)
console.log(emailSchema.isValid('Right@ex.com')); // true (подходит)

// Пример проверки возраста
const ageSchema = v.age().isAdult();
console.log(ageSchema.isValid(20)); // true
console.log(ageSchema.isValid(10)); // false (несовершеннолетний)

// Пример проверки объекта пользователя
const userSchema = v.user().shape({
  email: v.email().setEmailLengthConstraint(5),
  age: v.age().isAdult(),
});

console.log(userSchema.isValid({ email: 'user@domain.com', age: 25 })); // true (валидно)
console.log(userSchema.isValid({ email: 'usr@dm.com', age: 17 })); // false (не проходит по возрасту)
