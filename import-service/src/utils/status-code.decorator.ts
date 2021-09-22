export enum StatusCodeEnum {
  _500 = 500,
  _400 = 400,
  _200 = 200,
  _404 = 404
}

type CustomResponce = {
  body: string,
  statusCode: StatusCodeEnum,
  headers: { [k: string]: any }
}

class StatusCodeDescriptor {
  private readonly headers = {
    "Access-Control-Allow-Origin": "*",
  };

  public return200(res: any): CustomResponce {
    return {
      body: JSON.stringify(res),
      statusCode: StatusCodeEnum._200,
      headers: this.headers,
    };
  }

  public return500(error: any): CustomResponce {
    return {
      body: JSON.stringify({ error }),
      statusCode: StatusCodeEnum._500,
      headers: this.headers,
    };
  }

  public return404(): Omit<CustomResponce, 'body'> {
    return {
      statusCode: StatusCodeEnum._404,
      headers: this.headers,
    };
  }
}

const statusCodeDescriptor = new StatusCodeDescriptor();
export const StatusCode = () => {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      try {
        const result = targetMethod.apply(this, args);

        if (result instanceof Promise) {
          return result
            .then((result) => {
              if (result === undefined) {
                return statusCodeDescriptor.return404();
              } else {
                return statusCodeDescriptor.return200(result);
              }
            })
            .catch((error) => statusCodeDescriptor.return500(error.detail));
        } else {
          if (result === undefined) {
            return statusCodeDescriptor.return404();
          } else {
            return statusCodeDescriptor.return200(result);
          }
        }
      } catch (error) {
        return statusCodeDescriptor.return500(error.detail);
      }
    };
  };
};
