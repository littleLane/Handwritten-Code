const url = require("url");

const string =
  "https://user:pass@sub.host.com:8080/p/a/t/h?name=lane&query=string&a=aa#hash";

const urlObj = url.parse(string, true);
const urlQueryKeys = Object.keys(urlObj.query).sort();

console.log("urlQueryKeys", urlObj.query);

const newQueries = urlQueryKeys.map((key) => `${key}=${urlObj.query[key]}`);
newQueries.push("hashkey=ED24YHIJ");

urlObj.search = `?${newQueries.join("&")}`;

console.log("urlObj", url.format(urlObj));
