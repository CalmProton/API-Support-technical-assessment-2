function checkWord(word: string) {
  if (isPalindrome(word)) {
    console.log(`Word ${word} is a palindrome`);
  } else {
    console.log(`Word ${word} is not a palindrome`);
  }
}

function isPalindrome(word: string): boolean {
  const nword = word.toLowerCase();
  return nword === nword.split("").reverse().join("");
}

const word = "hello";
checkWord(word);
