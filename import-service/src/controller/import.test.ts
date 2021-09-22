import { ImportController } from "./import.controller";
import { APIGatewayProxyEvent, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import { StatusCodeEnum } from 'src/utils/status-code.decorator';

const importController = new ImportController();

describe("Test importProductsFile", () => {

  test("need return correct http request", () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: {
        name: 'test.csv'
      } as APIGatewayProxyEventQueryStringParameters
    } as APIGatewayProxyEvent;

    importController.importService.getSignedUrl = (fileName: string) => 'some_url/' + fileName;

    expect(typeof importController.getPresignedGETURL(event)).toEqual({
      body: 'some url/test.csv',
      statusCode: StatusCodeEnum._200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  });
});
