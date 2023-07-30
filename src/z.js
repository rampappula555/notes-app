const time = (h) => {
  let hours = h.slice(0, -2);
  const timeFormat = h.slice(-2);
  if (hours.length === 1) {
    hours = "0" + hours;
  }

  if (timeFormat === "am" && parseInt(hours) === 12) {
    return 24;
  } else if (timeFormat === "am" && !(parseInt(hours) === 12)) {
    return hours;
  } else if (timeFormat === "pm" && parseInt(hours) === 12) {
    return hours;
  } else if (timeFormat === "pm" && !(parseInt(hours) === 12)) {
    return parseInt(hours) + 12;
  }
};
//
const isPalindrome = (str) => {
  let a = {};
  const list = str.split("");

  for (let i of str) {
    const filteredList = list.filter((each) => each === i);
    a[i] = filteredList.length;
  }
  const b = Object.entries(a);
  const c = b.filter((a) => a[0] !== " ");
  const z = c.sort((x, y) => {
    let a = x[0].toLowerCase();
    let b = y[0].toLowerCase();
    if (a > b) {
      return 1;
    }
    if (a < b) return -1;
    return 0;
  });
  for (const [a, b] of z) {
    console.log(`${a}: ${b}`);
  }
};
//
const a = ["ram", "adsfs", "a", "alsakis", "hjshiiiig", "hjshiiiig", "", "ASD"];
const findMax = (arr) => {
  let minLength = Infinity;
  let minlenStr = "";
  for (let i of arr) {
    if (i.length < minLength) {
      minLength = i.length;
      minlenStr = i;
    }
  }
  return minlenStr;
};
//
const b = [
  { name: "ram", age: 100 },
  { name: "usduydf", age: 20 },
  { name: "uuu", age: 30 },
];
const c = b.sort((a, b) => a.age - b.age);
for (let i of a.values()) {
  console.log(i);
}
//
const d = [
  { id: 1, name: "ram" },
  { id: 1, name: "uma" },
  { id: 2, name: "lucky" },
];
const check = [];
const res = [];
d.forEach((each) => {
  if (!check.includes(each.id)) {
    check.push(each.id);
    res.push(each);
  } else {
    const index = res.findIndex((eachIndex) => eachIndex.id === each.id);
    if (index !== -1) {
      res.splice(index, 1, each);
    }
  }
});
//
const z = { name: "ram", age: 100, city: "hyd" };
const v = Object.entries(z);
const filtered = v.filter((each) => each[0] !== "city");
let result = {};
for (const [key, value] of filtered) {
  result[key] = value;
}
console.log(result);
//
const set = new Set([
  1,
  2,
  3,
  3,
  { a: "ram" },
  { a: "ram" },
  { a: "ram", age: 16 },
  { a: "ram", age: 1 },
]);
let arr = [];
for (let i of set.keys()) {
  arr.push(JSON.stringify(i));
}
let ans = [];
let flag = [];
arr.forEach((each) => {
  if (!flag.includes(each)) {
    ans.push(JSON.parse(each));
    flag.push(each);
  }
});
console.log(new Set(ans));
//
