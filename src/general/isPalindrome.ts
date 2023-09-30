function checkWord(word: string) {
  if (isPalindrome(word)) {
    console.log(`${word} - is a palindrome`);
  } else {
    console.log(`${word} - NOT a palindrome`);
  }
}

function isPalindrome(word: string): boolean {
  const nword = word.toLowerCase();
  return nword === nword.split("").reverse().join("");
}

const word = process.argv[2];
const defaultword = "APISupport";

if (word) {
  console.log(`\n`);
  checkWord(word);
  console.log(`\n`);
} else {
  console.log(
    `\nEntered word is not valid, using default value - ${defaultword}\n`
  );
  checkWord(defaultword);

  console.log(`\n`);
}
