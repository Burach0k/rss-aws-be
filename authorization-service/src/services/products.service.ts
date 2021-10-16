export class AuthService {
  public tokenAuth(event, _, callback) {
    
    if (event.type !== 'TOKEN') callback('Unauthorized');

    try {
      const creds = this.getCreds(event.authorizationToken);
      const principalId = this.encodeTokent(event.authorizationToken);
      const effect = this.getEffetcByCreds(creds);
      const policy = this.generatePolicy(principalId, event.methodArn, effect);
  
      callback(null, policy);
    } catch (error) {
      callback(`Unauthorized: ${error.message}`);
    }
  }

  private generatePolicy(principalId, resource, effect) {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
          }
        ]
      }
    }
  }

  private getCreds(token: string): { username: string, password: string } {
    const encodedToken = this.encodeTokent(token);
    const buffer = Buffer.from(encodedToken, 'base64');
    const plainToken = buffer.toString('utf-8').split(':');

    return {
      username: plainToken[0],
      password: plainToken[1],
    }
  }

  private getEffetcByCreds(creds: { username: string, password: string }): 'Deny' | 'Allow' {
    const storedUsername = process.env[creds.username];
    const storedPassword = process.env.TEST_PASSWORD;
    const isCorrectCreds = storedPassword
      && storedUsername
      && storedPassword === creds.password
      && storedUsername === creds.username;

    return isCorrectCreds ? 'Allow' : 'Deny';
  }

  private encodeTokent(token: string): string {
    return token.split(' ')[1];
  }
}
