'use strict';

class Person {
  constructor(name) {
    this.name = name;
  }
  // фабричный метод класса не обязательно должен быть статичным
  static factory(name) {
    return new Person(name);
  }
}

const p1 = new Person('Alexandr Suvorov');
const p2 = Person.factory('Alexandr Suvorov');

console.log(p1);
console.log(p2);
