import { createRequire } from "module";
import * as path from "path";
import * as process from "process";

const require = createRequire(import.meta.url);

//获取PackgeJson文件信息
let pkgManifest = require(path.join(process.cwd(), "package.json"));
console.log("pkgManifest", pkgManifest, require);
