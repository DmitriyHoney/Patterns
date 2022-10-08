'use strict';
const logable = (fields) => class Loggable {
  constructor(data) {
    this.values = data;
    for (const key in fields) {
      Object.defineProperty(Loggable.prototype, key, {
        get() {
          console.log('Readable: ', key);
          return this.values[key];
        },
        set(value) {
          const isValid = (
            typeof value === fields[key].type &&
            fields[key].validate(value)
          );
          if (!isValid) {
            console.log('Validation error: ', key, value);
            return;
          }
          this.values[key] = value;
          console.log('Writteble: ', key, value);
        }
      });
    }
  }
  toString() {
    let result = this.constructor.name + '\t';
    for (const key in fields) {
      result += this.values[key] + '\t';
    }
    return result;
  }
};

// Usage

const Person = logable({
  name: { type: 'string', validate: (name) => name.length > 0 },
  born: { type: 'number', validate: (born) => !(born % 1) },
});

const p1 = new Person({ name: 'Marcus Aurelius', born: 121 });
console.log(p1.toString());
p1.born = 1923;
console.log(p1.born);
p1.born = 100.5;
p1.name = 'Victor Glushkov';
console.log(p1.toString());
