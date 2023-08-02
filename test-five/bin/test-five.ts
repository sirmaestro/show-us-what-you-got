#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TestFiveStack } from '../lib/test-five-stack';

const app = new cdk.App();
new TestFiveStack(app, 'TestFiveStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});