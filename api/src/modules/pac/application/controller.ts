import { type Request, type Response } from 'express'
import PacService from '../service/pac.service'
import {
  GetPacCustomerCreditStatsInput,
  GetPacCustomerCreditReportInput,
  GetPacCustomerCreditReportFileInput,
  GetPacCustomerScoreReportInput,
  GetPacCustomerScoreReportFileInput
} from './pac.schema'

export default class PacController {
  constructor(private pacService: PacService) { }

  getPacCustomerCreditStats = async (
    req: Request<GetPacCustomerCreditStatsInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const data = await this.pacService.getPacCustomerCreditStats({ id })

      res.status(200).json(data)
    } catch (err) {
      console.log('Unable to get pac customer credit stats:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get pac customer credit stats',
        },
      })
    }
  }

  getPacCustomerCreditReport = async (
    req: Request<GetPacCustomerCreditReportInput['params'], {}, {}, GetPacCustomerCreditReportInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { status, startDate, endDate, page, perPage, pagination, q } = req.query
      const data = await this.pacService.getPacCustomerCreditReport({ id, status, startDate, endDate, page, perPage, pagination, q })

      res.status(200).json(data)
    } catch (err) {
      console.log('Unable to get pac customer credit report:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get pac customer credit report',
        },
      })
    }
  }

  getPacCustomerCreditReportFile = async (
    req: Request<GetPacCustomerCreditReportFileInput['params'], {}, {}, GetPacCustomerCreditReportFileInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { status, startDate, endDate } = req.query
      const { buffer, fileName } = await this.pacService.getPacCustomerCreditReportFile({ id, status, startDate, endDate })

      res.attachment(fileName)
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
      res.write(buffer)
      res.end()
    } catch (err) {
      console.log('Unable to get pac customer credit report file:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get pac customer credit report file',
        },
      })
    }
  }

  getPacCustomerScoreReport = async (
    req: Request<GetPacCustomerScoreReportInput['params'], {}, {}, GetPacCustomerScoreReportInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { status, startDate, endDate, page, perPage, pagination, q } = req.query
      const data = await this.pacService.getPacCustomerScoreReport({ id, status, startDate, endDate, page, perPage, pagination, q })

      res.status(200).json(data)
    } catch (err) {
      console.log('Unable to get pac customer score report:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get pac customer score report',
        },
      })
    }
  }

  getPacCustomerScoreReportFile = async (
    req: Request<GetPacCustomerScoreReportFileInput['params'], {}, {}, GetPacCustomerScoreReportFileInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { status, startDate, endDate } = req.query
      const { buffer, fileName } = await this.pacService.getPacCustomerScoreReportFile({ id, status, startDate, endDate })

      res.attachment(fileName)
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
      res.write(buffer)
      res.end()
    } catch (err) {
      console.log('Unable to get pac customer score report file:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get pac customer score report file',
        },
      })
    }
  }
}
