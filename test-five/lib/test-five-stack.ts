import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cluster, ContainerImage, FargateService, FargateTaskDefinition } from 'aws-cdk-lib/aws-ecs';

export class TestFiveStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an ECS cluster
    const cluster = new Cluster(this, 'ShowUsCluster', {
      clusterName: 'showUsCluster',
      containerInsights: true,
      enableFargateCapacityProviders: true,
    })

    // Task Definition
    const taskDefinition = new FargateTaskDefinition(this, 'ShowUsTaskDef')
    taskDefinition.addContainer('web', {
      image: ContainerImage.fromRegistry('expron/show-us-what-you-got:latest'),
    })

    // Fargate Service
    const fargateService = new FargateService(this, 'ShowUsFargateService', {
      cluster,
      taskDefinition,
      capacityProviderStrategies: [
        {
          capacityProvider: 'FARGATE_SPOT',
          weight: 2,
        },
        {
          capacityProvider: 'FARGATE',
          weight: 1,
        },
      ],
    })

    // Turn on autoscaling
    const scalableTarget = fargateService.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 20,
    })
    scalableTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
    })
    scalableTarget.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 50,
    })
  }
}
