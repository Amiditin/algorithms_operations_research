import fs from 'fs';

/** @type {(path: string) => string | undefined} */
const getFileData = (path) => {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf-8' });

    return data;
  } catch (err) {
    console.log(err);
  }
};

/** @type {(pathFileTest: string, pathFileWord: string) => { test: string, word: string}} */
const getStringsForTest = (pathFileTest, pathFileWord) => {
  const test = getFileData(pathFileTest);
  const word = getFileData(pathFileWord);

  return { test, word };
};

const filesPath = 'src/utils/lab1_substring/assets';

const pathsFiles = [
  { test: `${filesPath}/bad_t_1.txt`, word: `${filesPath}/bad_w_1.txt` },
  { test: `${filesPath}/bad_t_2.txt`, word: `${filesPath}/bad_w_2.txt` },
  { test: `${filesPath}/bad_t_3.txt`, word: `${filesPath}/bad_w_3.txt` },
  { test: `${filesPath}/bad_t_4.txt`, word: `${filesPath}/bad_w_4.txt` },
  { test: `${filesPath}/good_t_1.txt`, word: `${filesPath}/good_w_1.txt` },
  { test: `${filesPath}/good_t_2.txt`, word: `${filesPath}/good_w_2.txt` },
  { test: `${filesPath}/good_t_3.txt`, word: `${filesPath}/good_w_3.txt` },
  { test: `${filesPath}/good_t_4.txt`, word: `${filesPath}/good_w_4.txt` },
];

/** @type {(test: string, word: string) => { iteration: number, performance: number}} */
const startAlgorithmNaive = (test, word) => {
  const startTime = performance.now();
  let iteration = 0;

  for (let i = 0; i < test.length - word.length + 1; i++) {
    iteration += 1;

    if (test.slice(i, i + word.length) === word) {
      const endTime = performance.now();

      return { iteration, performance: endTime - startTime };
    }
  }

  const endTime = performance.now();

  return { iteration, performance: endTime - startTime };
};

/** @type {(test: string, word: string) => { iteration: number, performance: number}} */
const startALgorithmBoyerMoorHorspool = (test, word) => {
  const startTime = performance.now();

  let table = new Map();

  for (let i = word.length - 2; i >= 0; i--) {
    if (!table.has(word[i])) {
      table.set(word[i], word.length - i - 1);
    }
  }

  if (!table.has(word[word.length - 1])) {
    table.set(word[word.length - 1], word.length);
  }

  let iteration = 0;
  let curIndex = 0;

  while (curIndex < test.length - word.length + 1) {
    iteration += 1;

    const substr = test.slice(curIndex, curIndex + word.length);
    let breakFlag = false;

    for (let i = substr.length - 1; i >= 0; i--) {
      if (substr[i] !== word[i]) {
        curIndex += table.get(substr[i]) || word.length;

        breakFlag = true;
        break;
      }
    }

    if (!breakFlag) {
      const endTime = performance.now();

      return { iteration, performance: endTime - startTime };
    }
  }

  const endTime = performance.now();

  return { iteration, performance: endTime - startTime };
};

for (let i = 0; i < pathsFiles.length; i++) {
  const { test, word } = getStringsForTest(pathsFiles[i].test, pathsFiles[i].word);

  console.log(i, startALgorithmBoyerMoorHorspool(test || '', word || ''));
}
