const utils = {};

utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(count / max);
  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (arr, key) => {
  const groups = {};
  arr.forEach((item) => {
    const k = item[key];
    if (!groups[k]) {
      groups[k] = [];
    }
    groups[k].push(item);
  });
  return groups;
};

utils.flaggedUsers = [
  1663855616443,
  1663860827761,
  1663864583532,
];

utils.styles = {
  car: {color:' #00f',text:'🚗'},
  fish: {color:' #f00',text:'🐟'},
  house: {color:' #0f0',text:'🏚'},
  tree: {color:' #f0f',text:'🌳'},
  bicycle: {color:' #0ff',text:'🚴'},
  guitar: {color:' #ff0',text:'🎸'},
  pencil: {color:' #ff0',text:'📝'},
  clock: {color:' #ff0',text:'🕒'},
};
 

if (typeof module !== "undefined") {
  module.exports = utils;
}
