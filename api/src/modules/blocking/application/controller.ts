import { Request, Response } from 'express'
import { Multer } from 'multer'
import BlockingService from '../service/blocking.service'
import { ImportBlockingInput, GetCustomerReportInput, PaginationInput } from './blocking.schema'

type File = Express.Multer.File


export default class BlockingController {
  constructor(private blockingService: BlockingService) {}

  importBlocking = async (
    req: Request<{}, {}, ImportBlockingInput['body']>,
    res: Response
  ): Promise<unknown> => {
    const files = req.files as Express.Multer.File[]
    const { truncate } = req.body
 
    try {
      const importedBlocking = await this.blockingService.importBlocking({ files, truncate })

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

  createActivationReport = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
    try {
      const activationReportCreated = await this.blockingService.createActivationReport()

      res.status(200).json(activationReportCreated)
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

  getActivationReport = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
    try {
      const activationReport = await this.blockingService.getActivationReport()

      res.status(200).json(activationReport)
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

  getActivationReportFile = async (
    req: Request,
    res: Response
  ): Promise<unknown> => {
    try {
      const reportBuffer = await this.blockingService.getActivationReportFile()
      const currentDate = new Date().toISOString().split('T')[0]
      res.attachment(`Consolidado - ${currentDate}.xlsx`)
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
      res.write(reportBuffer)
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

  getCustomerReport = async (
    req: Request<{}, {}, {}, GetCustomerReportInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const fs = require('node:fs')

      const { name } = req.query
      const filePath = await this.blockingService.getCustomerReport(name)

      const currentDate = new Date().toISOString().split('T')[0]
      const fileName = `Reporte ${name} - ${currentDate}.csv`

      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.log(err)
        }
        fs.unlink(filePath, () => {
            console.log(`File ${filePath} was deleted`)
        })
      
        // fs.unlinkSync(yourFilePath) // If you don't need callback
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

  listImports = async (
    req: Request<{}, {}, {}, PaginationInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const imports = await this.blockingService.listImports(req.query)

      res.status(200).json(imports)
    } catch (err) {
      console.log('Unable to get imports:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get imports',
        },
      })
    }
  }
}
