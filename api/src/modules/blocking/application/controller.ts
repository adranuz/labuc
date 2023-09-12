import { Request, Response } from 'express'
import { Multer } from 'multer'
import BlockingService from '../service/blocking.service'
import { CreateBlockingReportInput, GetNuovoReportConsolidatedInput, GetCustomerReportInput, ListBlockingReportInput, CreateConsolidatedInput, GetNuovoReportInput, GetNuovoReportLogInput } from './blocking.schema'

type File = Express.Multer.File

export default class BlockingController {
  constructor(private blockingService: BlockingService) { }

  createBlockingReport = async (
    req: Request<{}, {}, CreateBlockingReportInput['body']>,
    res: Response
  ): Promise<unknown> => {
    const files = req.files as Express.Multer.File[]
    const { reportedAt } = req.body

    try {
      const importedBlocking = await this.blockingService.createBlockingReport({ files, reportedAt })

      res.status(201).json(importedBlocking)
    } catch (err) {
      console.log('Unable to import blocking:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to import blocking',
        },
      })
    }
  }

  createNuovoReportConsolidated = async (
    req: Request<CreateConsolidatedInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const nuovoReportConsolidatedCreated = await this.blockingService.createNuovoReportConsolidated(id)

      res.status(200).json(nuovoReportConsolidatedCreated)
    } catch (err) {
      console.log('Unable to create activation report:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to create activation report',
        },
      })
    }
  }

  getNuovoReportConsolidated = async (
    req: Request<GetNuovoReportConsolidatedInput['params'], {}, {}, GetNuovoReportConsolidatedInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { deviceType } = req.query

      const nuovoReportConsolidated = await this.blockingService.getNuovoReportConsolidated(id, deviceType)

      res.status(200).json(nuovoReportConsolidated)
    } catch (err) {
      console.log('Unable to get activation report:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get activation report',
        },
      })
    }
  }

  getNuovoReportConsolidatedFile = async (
    req: Request<GetNuovoReportConsolidatedInput['params'], {}, {}, GetNuovoReportConsolidatedInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { deviceType } = req.query

      const { buffer, fileName } = await this.blockingService.getNuovoReportConsolidatedFile(id, deviceType)

      res.attachment(fileName)
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
      res.write(buffer)
      res.end()
    } catch (err) {
      console.log('Unable to get activation report file:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get activation report file',
        },
      })
    }
  }

  getCustomerReportFile = async (
    req: Request<GetCustomerReportInput['params'], {}, {}, GetCustomerReportInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id, name } = req.params
      const { deviceType } = req.query
      const { filePath, fileName } = await this.blockingService.getCustomerReportFile(id, name, deviceType)

      const fs = require('node:fs')
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.log(err)
        }
        fs.unlink(filePath, () => {
          console.log(`File ${filePath} was deleted`)
        })
      })
    } catch (err) {
      console.log('Unable to get client report:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get client report',
        },
      })
    }
  }

  listBlockingReport = async (
    req: Request<{}, {}, {}, ListBlockingReportInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const imports = await this.blockingService.listBlockingReport(req.query)

      res.status(200).json(imports)
    } catch (err) {
      console.log('Unable to get list blocking report:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get list blocking report',
        },
      })
    }
  }

  getNuovoReport = async (
    req: Request<GetNuovoReportInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const imports = await this.blockingService.getNuovoReport(id)

      res.status(200).json(imports)
    } catch (err) {
      console.log('Unable to getNuovoReport:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to getNuovoReport',
        },
      })
    }
  }

  getNuovoReportLog = async (
    req: Request<GetNuovoReportLogInput['params'], {}, {}, GetNuovoReportLogInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { type } = req.query

      const imports = await this.blockingService.getNuovoReportLog(id, type)

      res.status(200).json(imports)
    } catch (err) {
      console.log('Unable to get getNuovoReportLog:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to getNuovoReportLog',
        },
      })
    }
  }
}
