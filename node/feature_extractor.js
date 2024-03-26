const constants = require("../common/constants.js");
const features = require("../common/features.js");

const fs = require("fs");

const samples = JSON.parse(fs.readFileSync(constants.SAMPLE));

for (const sample of samples) {
  const paths = JSON.parse(
    fs.readFileSync(constants.JSON_DIR + "/" + sample.id + ".json"),
  );
  sample.point = [features.getPathCount(paths), features.getPointCount(paths)];
}

const featureName = ["Path Count", "Point Count"];

fs.writeFileSync(constants.FEATURES, JSON.stringify({ fetaureName, samples }));
