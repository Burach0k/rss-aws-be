enum LogTypeEnum {
  warning = 'Warning',
  error = 'Error',
  info = 'Info',
}

export class Logging {
  static deleteLogs(): void {
    console.clear();
  }

  static addLog(message: string): void {
    console.log(message);
  }
}

class LogFunction {
  public addLog(args: any[], functionResult: any, logType: LogTypeEnum = LogTypeEnum.info): void {
    const logMessage = this.createLogMessage(args, functionResult, logType);
    Logging.addLog(logMessage);
  }

  private createLogMessage(args: any[], functionResult: any, logType: LogTypeEnum = LogTypeEnum.info): string {
    const title = `${logType} : ${new Date()}`;
    const argsInfo = `args: ${JSON.stringify(args)}`;
    const resultInfo = `result:${JSON.stringify(functionResult)}`;

    return `${title}\n${argsInfo}\n${resultInfo}\n\n`;
  }

  public logSucces(args: any[], functionResult: any, logType: LogTypeEnum): any {
    this.addLog(args, functionResult, logType);
    return functionResult;
  }

  public logCatch(args: any[], error: any, logType: LogTypeEnum): any {
    this.addLog(args, error, logType);
    throw error;
  }
}

const logFunction = new LogFunction();
export const Log = (logType: LogTypeEnum = LogTypeEnum.info) => {

  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const result = targetMethod.apply(this, args);

        if (result instanceof Promise) {
          return result
            .then((res) => logFunction.logSucces(args, res, logType))
            .catch((err) => logFunction.logCatch(args, err, LogTypeEnum.error));
        } else {
          return logFunction.logSucces(args, result, logType);
        }

      } catch (error) {
        return logFunction.logCatch(args, error, LogTypeEnum.error);
      }
    };
  };
};
