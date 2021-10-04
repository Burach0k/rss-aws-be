import { S3, config } from "aws-sdk";
import * as csv from "csv-parser";
import fetch from "node-fetch";

export class ImportService {
  public readonly Bucket = "import-service-task5";

  public getSignedUrl(fileName: string): string {
    config.update({ region: "eu-west-1", signatureVersion: "v4" });

    const s3 = new S3();

    return s3.getSignedUrl("putObject", {
      Bucket: this.Bucket,
      Key: fileName,
      Expires: 100,
      ContentType: "text/csv",
    });
  }

  public parseInnerFile(records: any[]) {
    return Promise
      .all(records.map(this.parseS3File.bind(this)))
      .then(this.moveBucketFiles.bind(this));
  }

  private parseS3File(record): Promise<{ fileName: string }> {
    const s3 = new S3();
    const fileName = record.s3.object.key;

    return new Promise((resolve, reject) => {
      const csvDataList = [];

      s3.getObject({ Bucket: this.Bucket, Key: fileName })
        .createReadStream()
        .pipe(csv())
        .on("data", (data) => {
          data.price = +data.price;
          data.count = +data.count;
          csvDataList.push(data)
        })
        .on("error", reject)
        .on("end", async () => {
          await this.sendToCatalogItemsQueue(csvDataList);
          resolve({ fileName });
        });
    });
  }

  public sendToCatalogItemsQueue(csvDataList) {
    return fetch(
      "https://uevyoxihci.execute-api.eu-west-1.amazonaws.com/dev/catalogItemsQueue",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(csvDataList),
      }
    )
  }

  public sendFile(csvDataList: any[]) {
    return fetch(
      "https://1ztz8u9329.execute-api.eu-west-1.amazonaws.com/dev/products",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(csvDataList),
      }
    )
  }

  private moveBucketFiles(parseResult: any[]): Promise<any[]> {
    return Promise.all(parseResult.map(this.moveBucketFile.bind(this)));
  }

  private moveBucketFile(fileInfo: { fileName: string }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const s3 = new S3();
      const CopySource = `${this.Bucket}/${fileInfo.fileName}`;

      s3.copyObject(
        {
          Metadata: {},
          Bucket: this.Bucket,
          CopySource,
          ContentType: 'text/csv',
          Key: fileInfo.fileName.replace("uploaded", "parsed"),
        },
        (error) => {
            if (!error) {
              s3.deleteObject({ Bucket: this.Bucket, Key: fileInfo.fileName }, resolve)
            } else {
              reject(error);
            }
        }
      );
    });
  }
}
