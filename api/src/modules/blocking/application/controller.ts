import { Request, Response } from 'express'
import { Multer } from 'multer'
import BlockingService from '../service/blocking.service'
import { CreateBlockingReportInput, GetBlockingDeviceConsolidatedReportInput, GetCustomerReportInput, ListBlockingReportInput, CreateConsolidatedInput, GetBlockingDeviceInput, GetBlockingDeviceImportLogInput } from './blocking.schema'

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

  createBlockingDeviceConsolidatedReport = async (
    req: Request<CreateConsolidatedInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const blockingDeviceConsolidatedReportCreated = await this.blockingService.createBlockingDeviceConsolidatedReport(id)

      res.status(200).json(blockingDeviceConsolidatedReportCreated)
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

  getBlockingDeviceConsolidatedReport = async (
    req: Request<GetBlockingDeviceConsolidatedReportInput['params'], {}, {}, GetBlockingDeviceConsolidatedReportInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { deviceType } = req.query

      const blockingDeviceConsolidatedReport = await this.blockingService.getBlockingDeviceConsolidatedReport(id, deviceType)

      res.status(200).json(blockingDeviceConsolidatedReport)
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

  getBlockingDeviceConsolidatedReportFile = async (
    req: Request<GetBlockingDeviceConsolidatedReportInput['params'], {}, {}, GetBlockingDeviceConsolidatedReportInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { deviceType } = req.query

      const { buffer, fileName } = await this.blockingService.getBlockingDeviceConsolidatedReportFile(id, deviceType)

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

  getBlockingDevice = async (
    req: Request<GetBlockingDeviceInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const imports = await this.blockingService.getBlockingDevice(id)

      res.status(200).json(imports)
    } catch (err) {
      console.log('Unable to getBlockingDevice:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to getBlockingDevice',
        },
      })
    }
  }

  getBlockingDeviceImportLog = async (
    req: Request<GetBlockingDeviceImportLogInput['params'], {}, {}, GetBlockingDeviceImportLogInput['query']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const { type } = req.query

      const imports = await this.blockingService.getBlockingDeviceImportLog(id, type)

      res.status(200).json(imports)
    } catch (err) {
      console.log('Unable to get getBlockingDeviceImportLog:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to getBlockingDeviceImportLog',
        },
      })
    }
  }
}
