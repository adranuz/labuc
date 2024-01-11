import prismaClient from '../../common/persistence/prisma-client'
import { Prisma } from '@prisma/client'

import Option from '../../common/types/Option.type'

import IConsumptionRepository from '../service/IConsumptionRepository'

export default class ConsumptionRepository implements IConsumptionRepository {
  async sendConsumptionHubData(data: any): Promise<any> {
    const consumptionCreated = await prismaClient.consumption.create({
      data: {
        ...data,
      },
    })
    return consumptionCreated
  }
}
