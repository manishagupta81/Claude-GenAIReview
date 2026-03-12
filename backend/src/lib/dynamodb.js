'use strict';

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
} = require('@aws-sdk/lib-dynamodb');

const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.REGION || 'us-east-1';

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

/**
 * Put a single item into the table.
 */
async function putItem(item) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  });
  return docClient.send(command);
}

/**
 * Get a single item by primary key (PK) and sort key (SK).
 */
async function getItem(pk, sk) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { PK: pk, SK: sk },
  });
  const result = await docClient.send(command);
  return result.Item || null;
}

/**
 * Update an item with a custom update expression.
 */
async function updateItem(pk, sk, updateExpression, expressionAttributeNames, expressionAttributeValues) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { PK: pk, SK: sk },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  });
  return docClient.send(command);
}

/**
 * Query items by partition key on the main table.
 */
async function queryByPK(pk) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: { ':pk': pk },
  });
  const result = await docClient.send(command);
  return result.Items || [];
}

/**
 * Query items on GSI1 by GSI1PK and optional GSI1SK.
 */
async function queryGSI1(gsi1pk, gsi1sk) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'GSI1',
    KeyConditionExpression: gsi1sk
      ? 'GSI1PK = :gsi1pk AND GSI1SK = :gsi1sk'
      : 'GSI1PK = :gsi1pk',
    ExpressionAttributeValues: { ':gsi1pk': gsi1pk },
  };

  if (gsi1sk) {
    params.ExpressionAttributeValues[':gsi1sk'] = gsi1sk;
  }

  const command = new QueryCommand(params);
  const result = await docClient.send(command);
  return result.Items || [];
}

/**
 * Query items on GSI2 by GSI2PK with pagination support.
 */
async function queryGSI2(gsi2pk, limit, nextToken) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :gsi2pk',
    ExpressionAttributeValues: { ':gsi2pk': gsi2pk },
  };

  if (limit) {
    params.Limit = limit;
  }

  if (nextToken) {
    params.ExclusiveStartKey = JSON.parse(Buffer.from(nextToken, 'base64').toString('utf8'));
  }

  const command = new QueryCommand(params);
  const result = await docClient.send(command);

  let encodedNextToken = null;
  if (result.LastEvaluatedKey) {
    encodedNextToken = Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64');
  }

  return {
    items: result.Items || [],
    nextToken: encodedNextToken,
  };
}

module.exports = {
  putItem,
  getItem,
  updateItem,
  queryByPK,
  queryGSI1,
  queryGSI2,
};
