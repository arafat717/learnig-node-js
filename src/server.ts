import { createServer, IncomingMessage, ServerResponse } from "http";
import config from "./config/config";
import { serverRoutes } from "./route/route";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  serverRoutes(req, res);
});

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
