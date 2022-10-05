'use strict';

const loggable = (fields) => {
  function Loggable(data) {
    this.values = data;
  }

  for (const key in fields) {
    Object.defineProperty(Loggable.prototype, key, {
      get() {
        console.log('Reading prop: ' + key);
        return this.values[key];
      },
      set(value) {
        console.log('Writting prop: ', key, value);
        const isValid = (
          typeof value === fields[key].type &&
          fields[key].validate(value)
        );
        if (!isValid) console.log('Validation failed: ' + key, value);
        else this.values[key] = value;
      }
    });
  }

  Loggable.prototype.toString = function() {
    let result = this.constructor.name + ': ';
    for (const key in fields) {
      result += this.values[key] + ' ';
    }
    return result;
  };

  return Loggable;
};

const Person = loggable({
  name: { type: 'string', validate: (val) => val.length > 3 },
  born: { type: 'number', validate: (val) => !(val % 1) }
});

const p1 = new Person({ name: 'Alexandr Suvorov', born: 1730 });
console.log(p1.toString());
p1.born = 1731;
console.log(p1.born);
p1.born = 100.5;
p1.name = 'Victor Glushkov';
console.log(p1.toString());
