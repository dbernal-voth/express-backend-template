import { Router } from "express";
import fs from "fs";
import path from "path";

const basename = path.basename(__filename);

function importRoutes(app: Router, currentPath = __dirname) {
  fs.readdirSync(currentPath).forEach((file) => {
    if (file === basename) return;
    const newPath = path.join(currentPath, file);
    if (fs.lstatSync(newPath).isDirectory()) {
      importRoutes(app, newPath);
    }
    if (
      file.indexOf(".") !== 0 &&
      (file.slice(-10) === ".routes.js" || file.slice(-10) === ".routes.ts")
    ) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const importedFile = require(path.join(currentPath, file));
      importedFile.default(app);
    }
  });
}

export default importRoutes;
