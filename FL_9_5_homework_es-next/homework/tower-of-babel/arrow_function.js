let inputs = process.argv.slice(2);

let result = inputs.map((e) => e[0].toUpperCase())
    .reduce((result, current) => result + current);
console.log(result);
