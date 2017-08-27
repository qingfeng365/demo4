'use strict';

var newerror = new Error('this is new error');

console.dir(newerror);
console.log(newerror.name);
console.log(newerror.message);

try {
  throw newerror;
} catch (e) {
  console.dir(e);
  console.log(e.name);
  console.log(e.message);
}
