import { Request, Response } from "express";
import ConsumptionService from "../service/consumption.service";

export default class ConsumptionController {
  constructor(private consumptionService: ConsumptionService) {}
  
  sendConsumptionHubData = async (
      req: Request<{}, {}, {}, {}>,
      res: Response,
    ): Promise<unknown> => {
      try {
        const { body } = req
        const result = await this.consumptionService.sendConsumptionHubData(body)
        res.status(200).json(result)
      } catch (error) {
        console.log('Unable create consumption: ', error)
        return res.status(500).json({
          error: {
            code: 500,
            message: 'Server Internal Error',
            details: 'Unable create consumption',
          },
        })
      }
    }
}