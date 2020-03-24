const csvTOJson = require("convert-csv-to-json");

const input = "./src/covid_19data.csv";
const output = "./public/covid19.json";

csvTOJson
  .fieldDelimiter(",")
  .formatValueByType()
  .generateJsonFileFromCsv(input, output);
