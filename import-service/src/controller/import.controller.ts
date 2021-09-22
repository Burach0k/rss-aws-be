import { APIGatewayProxyEvent } from "aws-lambda";
import { Log } from "../utils/log.decorator";
import { StatusCode } from "../utils/status-code.decorator";
import { ImportService } from "./import-service.service";

export class ImportController {
  public importService: ImportService = new ImportService();

  @Log()
  @StatusCode()
  public getPresignedGETURL(event: APIGatewayProxyEvent) {
    const filePaths = event.queryStringParameters.name.split('/');
    const fileName = 'uploaded/' + filePaths[filePaths.length - 1];

    return this.importService.getSignedUrl(fileName);
  }

  @Log()
  public parseFile(event) {
    return this.importService.parseInnerFile(event.Records);
  }
}
