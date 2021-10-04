import { SQS, SNS } from "aws-sdk";
import { MessageAttributeMap } from "aws-sdk/clients/sns";

export class QueueService {
  private sqs = new SQS();
  private sns = new SNS({ region: 'eu-west-1' });

  public sendProductListToSQS(productList: any[]): Promise<any> {
    return Promise.all(
      productList.map((product) => this.sendToSQS(JSON.stringify(product)))
    );
  }

  public sendEmail(Subject: string, Message: string, MessageAttributes: MessageAttributeMap): Promise<any> {
    return this.sns
        .publish({ Subject, Message, TopicArn: process.env.SNS_ARN, MessageAttributes })
        .promise();
  }

  private sendToSQS(MessageBody): Promise<any> {
    return this.sqs
        .sendMessage({ QueueUrl: process.env.SQS_URL, MessageBody })
        .promise();
  }
}
