import type { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "../utilis/sendResponse";
import { getAllFriends, insertFriends } from "../service/friends.service";
import { bodyParser } from "../utilis/bodyparser";

export const friendsService = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const str = url?.split("/");
  console.log(str);
  const id = str && str[1] === "friends" ? str[2] : null;
  console.log(id);

  if (url === "/friends" && method === "GET") {
    const friends = getAllFriends();
    return sendResponse(
      res,
      200,
      true,
      "Friends are retrived successfully!",
      friends,
    );
  } else if (method === "GET" && id !== null) {
    const friends = getAllFriends();
    console.log(friends);
    const friend = friends.find((frnd: any) => frnd.id === id);
    if (!friend) {
      return sendResponse(res, 404, false, "Product not found!");
    }
    console.log(friend);
    return sendResponse(
      res,
      200,
      true,
      "Friend retrived successfully!",
      friend,
    );
  } else if (url === "/friends" && method === "POST") {
    // console.log("post");
    const body = await bodyParser(req);
    const friends = getAllFriends();
    const payload = {
      id: new Date(),
      ...body,
    };
    friends.push(payload);
    // console.log(body);
    insertFriends(friends);
    return sendResponse(
      res,
      200,
      true,
      "Friend created successfully!",
      friends,
    );
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const friends = getAllFriends();
    const index = friends.findIndex((frnd: any) => frnd.id === id);
    friends[index] = { id: friends[index]?.id, ...body };
    if (index < 0) {
      return sendResponse(res, 500, true, "Id not found!", friends);
    }
    insertFriends(friends);
    return sendResponse(
      res,
      200,
      true,
      "Friend updated successfully!",
      friends[index],
    );
  } else if (method === "DELETE" && id !== null) {
    const friends = getAllFriends();
    const index = friends.findIndex((frnd: any) => frnd.id === id);
    if (!index) {
      return sendResponse(res, 500, true, "Friend not found!", friends);
    }
    friends.splice(index, 1);
    insertFriends(friends);
    return sendResponse(
      res,
      200,
      true,
      "Friend deleted successfully!",
      friends[index],
    );
  }
};
