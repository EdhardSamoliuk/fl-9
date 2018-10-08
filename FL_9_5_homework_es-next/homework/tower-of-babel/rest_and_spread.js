let rawArgs = process.argv.slice(2);
let args = [];

rawArgs.forEach(val => {
    let commaSep = val.split(',');
    commaSep.forEach(val => {
        if (val !== '') args.push(+val);
    });
});

const avg = (...args) => args.reduce((result, current) => result + current) / args.length;

console.log(avg(...args));
