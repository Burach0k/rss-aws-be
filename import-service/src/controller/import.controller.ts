import { APIGatewayProxyEvent } from "aws-lambda";
import { MessageAttributeMap } from "aws-sdk/clients/sns";
import { Log } from "../utils/log.decorator";
import { StatusCode } from "../utils/status-code.decorator";
import { ImportService } from "./import-service.service";
import { QueueService } from "./queue.service";

export class ImportController {
  public importService: ImportService = new ImportService();
  public queueService: QueueService = new QueueService();

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

  @Log()
  @StatusCode()
  public catalogItemsQueue(event: APIGatewayProxyEvent) {
    const productList: any[] = JSON.parse(event.body);
    return this.queueService.sendProductListToSQS(productList);
  }

  @Log()
  @StatusCode()
  public catalogBatchProcess(event) {
    const productList: any[] = event.Records.map(record => JSON.parse(record.body));
    const message = `Опубликованы следующие товары: ${productList.map(product => product.title).join(', ')}`;
    const messageAttributeMap: MessageAttributeMap = {
      price: {
        DataType: 'Number',
        StringValue: `${productList[0].price}`
      }
    };

    return this.importService
      .sendFile(productList)
      .then(() => this.queueService.sendEmail('Ваши товары опубликованы', message, messageAttributeMap))
  }
}
