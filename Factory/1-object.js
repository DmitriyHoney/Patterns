'use strict';

const factory = (name, age, email) => {
  1;
  return { name, age, email };
};

const factory2 = (name, age, email) => ({ name, age, email });

const factory3 = (name, age, email) => {
  name, age, email;
};

const factory4 = (name, age, email) => (name, age, email);


console.log(factory('Alexandr', 30, 'suvorov@ya.ru'));
console.log(factory2('Alexandr', 30, 'suvorov@ya.ru'));
console.log(factory3('Alexandr', 30, 'suvorov@ya.ru'));
console.log(factory4('Alexandr', 30, 'suvorov@ya.ru'));

