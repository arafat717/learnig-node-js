import path from "path";
import fs from "fs";

const filePath = path.resolve(process.cwd(), "./src/database/data.json");

export const getAllFriends = () => {
  const friends = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(friends);
};

export const insertFriends = (payload: any) => {
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
