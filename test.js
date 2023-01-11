
const defaultStr = `import { Dialog } from '@mui/material';`;
const str = process.argv[2] ?? defaultStr;

const RE_LINE = /import { ([\w, ]+) } from '@mui\/material';?/;

const match = str.match(RE_LINE);

if (!match) {
  return;
}

const str1 = match[1];
const RE_PART = /(\w+)/g;
const match1 = str1.match(RE_PART);
console.log('1', match1);

const res = match1
  .map((m) => {
    return `import ${m} from '@mui/material/${m}';`;
  })


const res1 = res
  .sort((a, b) => {
    // console.log('a, b', a.length, b.length, a > b)
    return a.length - b.length;
    if (a.length === b.length) {
      return 0;
    }
    return a.length > b.length ? 1 : -1;
  })

console.log(res1.join('\n'));


