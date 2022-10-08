'use strict';

const factorify = (Category) => (...args) => new Category(...args);

class Person {
  constructor(name) {
    this.name = name;
  }
}

const personFactory = factorify(Person);
const p1 = personFactory('Alexandr Suvorov');
const p2 = new Person('Alexandr Suvorov');
console.log(p1);
console.log(p2);
