import type { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "../utilis/sendResponse";
import { friendsService } from "../controller/friends.controller";

export const serverRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    try {
      return sendResponse(res, 200, true, "Server is running");
    } catch (err: any) {
      return sendResponse(res, 500, false, "Something went wrong!");
    }
  } else if (url?.startsWith("/friends")) {
    friendsService(req,res)
  } else {
    return sendResponse(res, 500, false, "Something went wrong!");
  }
};
