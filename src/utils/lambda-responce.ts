export type requestDTO = {
  statusCode: 200 | 404;
  body: string;
  headers: { [key: string]: any };
};

export const createOKResponce = (body: any): requestDTO => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body),
  };
};

export const createNotFoundResponce = (error: string): requestDTO => {
  return {
    statusCode: 404,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: error,
  };
};