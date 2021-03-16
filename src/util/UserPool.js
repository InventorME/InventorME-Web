import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_GqNZeYNoc',
  ClientId: '5j8psldhn3891tp9bm2ms1l5ra'
};

export default new CognitoUserPool(poolData);