result = {};
for (let i = 0; i < localStorage.length; i += 1) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log("🚀 ~ file: lc-dump.js:5 ~ value:", value)
  result[key] = value;
}
console.log(JSON.stringify(result))
