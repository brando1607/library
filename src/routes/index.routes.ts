import { Router } from "express";
import { readdirSync } from "fs";

export const router = Router();
const router_path = `${__dirname}`;

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(router_path).filter((fileName) => {
  const cleanedName = cleanFileName(fileName);
  if (cleanedName !== "index") {
    import(`./${cleanedName}.routes`).then((routeModule) => {
      console.log(`${cleanedName} route loaded.`);

      router.use(`/${cleanedName}`, routeModule.router);
    });
  }
});
