interface Output {
  [key: number]: number;
}

function countDuplicates(numbers: number[]) {
  let output: Output = {};

  numbers.forEach((number) => {
    if (!(number in output)) {
      output[number] = 1;
    } else {
      output[number] += 1;
    }
  });

  for (let key in output) {
    if (output[key] === 1) {
      delete output[key];
    }
  }

  if (Object.keys(output).length > 0) {
    console.log(output);
  } else {
    console.log(`No duplicates found`);
  }
}

const numbers = process.argv.slice(2).map(Number);
const defaultNumbers = [1, 2, 2, 3, 4, 4, 4, 5];

if (numbers[0]) {
  console.log(`\n`);
  countDuplicates(numbers);
  console.log(`\n`);
} else {
  console.log(
    `\nEntered numbers are not valid, using default value - ${defaultNumbers}\n`
  );
  countDuplicates(defaultNumbers);

  console.log(`\n`);
}
