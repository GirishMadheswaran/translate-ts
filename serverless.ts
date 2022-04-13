import type { AWS } from "@serverless/typescript";

// import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: "aws-typescript-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "serverless",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["translate:*"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: {
    translate: {
      handler: "lambdas/translate.handler",
      events: [
        {
          http: {
            path: "translate",
            method: "POST",
            cors: true,
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
