import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  statsCode: number,
  success: boolean,
  message: string,
  data?: any,
) => {
  const sendResponse = {
    success,
    message,
    data,
  };

  res.writeHead(statsCode, { "Content-type": "application/json" });
  res.end(JSON.stringify(sendResponse));
};
