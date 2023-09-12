import prismaClient from '../../common/persistence/prisma-client'
import Option from '../../common/types/Option.type'
import IPacRepository from '../service/IPacRepository'
import {
  getPacCustomerCreditStatsDTO,
  getPacCustomerCreditStatsResponseDTO,
  getPacCustomerCreditReportDTO,
  getPacCustomerCreditReportResponseDTO,
  getPacCustomerCreditReportFileDTO,
  getPacCustomerScoreReportDTO,
  getPacCustomerScoreReportResponseDTO
} from '../dto/pac.dto'
import PacCreditReport from '../entities/PacCreditReport.entity'

export default class PacRepository implements IPacRepository {
  async getPacCustomerCreditStats ({ id }: getPacCustomerCreditStatsDTO): Promise<Option<getPacCustomerCreditStatsResponseDTO>> {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id
      },
      select: {
        dbName: true
      }
    })

    if (!customer) return null

    const dbName = customer?.dbName

    if (!dbName) return null

    let data: getPacCustomerCreditStatsResponseDTO = {
      generalCount: 0,
      statusAnulCount: 0,
      statusCancCount: 0,
      statusDefiCount: 0,
      statusMoraCount: 0,
      statusPendCount: 0,
      successScore: 0,
      errorScore: 0,
      createdAt: undefined,
    }

    try {
      const report = await prismaClient.$queryRaw<PacCreditReport[]>`SELECT * FROM "PacCreditReport" WHERE client = ${dbName} ORDER BY created_at DESC LIMIT 1`

      if (report.length > 0) {
        const {
          general_count: generalCount,
          status_count: statusCount,
          success_score: successScore,
          error_score: errorScore,
          created_at: createdAt
        } = report[0]

        const {
          ANUL: statusAnulCount,
          CANC: statusCancCount,
          DEFI: statusDefiCount,
          MORA: statusMoraCount,
          PEND: statusPendCount,
        } = statusCount

        data = {
          generalCount,
          statusAnulCount,
          statusCancCount,
          statusDefiCount,
          statusMoraCount,
          statusPendCount,
          successScore,
          errorScore,
          createdAt,
        }
      }
    } catch (err) { }

    return data
  }

  async getPacCustomerCreditReport ({ id, status, startDate, endDate, perPage = 10, page = 0, q = '', pagination = true }: getPacCustomerCreditReportDTO): Promise<Option<getPacCustomerCreditReportResponseDTO>> {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id
      },
      select: {
        dbName: true
      }
    })

    if (!customer) return null

    const { dbName } = customer

    if (!dbName) return null

    const mysql = require('mysql2/promise')

    const dbUrl = dbName === 'telcelint_core'
      ? process.env.TELCEL_DATABASE_URL
      : process.env.PACS_DATABASE_URL_WITHOUT_DBNAME?.concat(dbName)

    const connection = await mysql.createConnection(dbUrl)

    const [data] = await connection.execute(
      `
        SELECT prestamos.id AS creditId,
          marcas.nombre AS branch,
          modelos.nombre AS model,
          prestamos.data->>"$.imei" AS imei,
          prestamos.fechahora_emision AS saleDate,
          prestamos.estado AS creditStatus
        FROM ${dbName}.prestamos
          INNER JOIN ${dbName}.productos ON prestamos.producto_id = productos.id
          INNER JOIN ${dbName}.modelos ON productos.modelo_id = modelos.id
          INNER JOIN ${dbName}.marcas ON marcas.id = modelos.marca_id
        WHERE
          ${startDate && endDate ? `DATE(prestamos.fechahora_emision) BETWEEN '${startDate}' AND '${endDate}'` : 'TRUE'}
        AND
          ${status ? `prestamos.estado = '${status}'` : 'TRUE'}
        LIMIT
          ${perPage}
        OFFSET
          ${perPage * page}
      `
    )

    if (data.length === 0) return null

    const [count] = await connection.execute(
      `
        SELECT 
          COUNT(*) AS total
        FROM ${dbName}.prestamos
          INNER JOIN ${dbName}.productos ON prestamos.producto_id = productos.id
          INNER JOIN ${dbName}.modelos ON productos.modelo_id = modelos.id
          INNER JOIN ${dbName}.marcas ON marcas.id = modelos.marca_id
        WHERE
          ${startDate && endDate ? `DATE(prestamos.fechahora_emision) BETWEEN '${startDate}' AND '${endDate}'` : 'TRUE'}
        AND
          ${status ? `prestamos.estado = '${status}'` : 'TRUE'}
      `
    )

    const { total } = count[0]

    return { total, page, perPage, data }
  }

  async getPacCustomerCreditReportFile ({ id, status, startDate, endDate }: getPacCustomerCreditReportFileDTO): Promise<any> {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        dbName: true
      }
    })

    if (!customer) return null

    const { name, dbName } = customer

    if (!dbName) return null

    const mysql = require('mysql2/promise')

    const dbUrl = dbName === 'telcelint_core'
      ? process.env.TELCEL_DATABASE_URL
      : process.env.PACS_DATABASE_URL_WITHOUT_DBNAME?.concat(dbName)

    const connection = await mysql.createConnection(dbUrl)

    const [data] = await connection.execute(
      `
        SELECT prestamos.id AS creditId,
          marcas.nombre AS branch,
          modelos.nombre AS model,
          prestamos.data->>"$.imei" AS imei,
          prestamos.fechahora_emision AS saleDate,
          prestamos.estado AS creditStatus
        FROM ${dbName}.prestamos
          INNER JOIN ${dbName}.productos ON prestamos.producto_id = productos.id
          INNER JOIN ${dbName}.modelos ON productos.modelo_id = modelos.id
          INNER JOIN ${dbName}.marcas ON marcas.id = modelos.marca_id
        WHERE
          ${startDate && endDate ? `DATE(prestamos.fechahora_emision) BETWEEN '${startDate}' AND '${endDate}'` : 'TRUE'}
        AND
          ${status ? `prestamos.estado = '${status}'` : 'TRUE'}
      `
    )

    if (data.length === 0) return null

    const XLSX = require('xlsx')

    const heading = [['Número de crédito', 'Marca', 'Modelo', 'IMEI', 'Fecha de venta', 'Estado']];

    const workBook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte')
    XLSX.utils.sheet_add_aoa(workSheet, heading, { origin: 'A1' });

    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    const fileName = `Reporte Créditos PAC - ${name}.xlsx`

    return { buffer, fileName }
  }

  async getPacCustomerScoreReport ({ id, status, startDate, endDate, perPage = 10, page = 0, q = '', pagination = true }: getPacCustomerScoreReportDTO): Promise<Option<getPacCustomerScoreReportResponseDTO>> {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id
      },
      select: {
        dbName: true
      }
    })

    if (!customer) return null

    const { dbName } = customer

    if (!dbName) return null

    const mysql = require('mysql2/promise')

    const dbUrl = process.env.PACS_DATABASE_URL_WITHOUT_DBNAME?.concat(dbName)

    const connection = await mysql.createConnection(dbUrl)

    const [data] = await connection.execute(
      `
        SELECT solicitudes.prestamo_id AS creditId,
          credolab.reference_number AS reference,
          solicitudes.id AS requestId,
          solicitudes.sys_fecha_alta AS requestDate,
          CASE
            WHEN solicitudes.prestamo_id IS NULL THEN 'No aceptado'
            ELSE 'Aceptado'
          END AS status,
          credolab.dataset->>'$.scores[0].value' AS score,
          CASE
            WHEN devicesUsedMoreThanOnce.count IS NOT NULL THEN 'Si'
            ELSE 'No'
          END AS previouslyValidatedDevice,
          credolab.dataset->>'$.fragments[0].value.deviceID' AS deviceId
        FROM ${dbName}.solicitudes
          INNER JOIN ${dbName}.credolab ON solicitudes.id = credolab.solicitud_id
          LEFT JOIN (
            SELECT credolab.dataset->>'$.fragments[0].value.deviceID' AS deviceId,
              COUNT(*) AS count
            FROM ${dbName}.credolab
            GROUP BY deviceId
            HAVING count > 1
          ) AS devicesUsedMoreThanOnce ON devicesUsedMoreThanOnce.deviceId = credolab.dataset->>'$.fragments[0].value.deviceID'
        WHERE
          ${startDate && endDate ? `DATE(solicitudes.sys_fecha_alta) BETWEEN '${startDate}' AND '${endDate}'` : 'TRUE'}
        AND
          ${status === 'accepted' ? `solicitudes.prestamo_id IS NOT NULL` : 'TRUE'}
        AND
          ${status === 'notAccepted' ? `solicitudes.prestamo_id IS NULL` : 'TRUE'}
        LIMIT
          ${perPage}
        OFFSET
          ${perPage * page}
      `
    )

    if (data.length === 0) return null

    const [count] = await connection.execute(
      `
        SELECT solicitudes.prestamo_id AS creditId,
          COUNT(*) AS total
        FROM ${dbName}.solicitudes
          INNER JOIN ${dbName}.credolab ON solicitudes.id = credolab.solicitud_id
          LEFT JOIN (
            SELECT credolab.dataset->>'$.fragments[0].value.deviceID' AS deviceId,
              COUNT(*) AS count
            FROM ${dbName}.credolab
            GROUP BY deviceId
            HAVING count > 1
          ) AS devicesUsedMoreThanOnce ON devicesUsedMoreThanOnce.deviceId = credolab.dataset->>'$.fragments[0].value.deviceID'
        WHERE
          ${startDate && endDate ? `DATE(solicitudes.sys_fecha_alta) BETWEEN '${startDate}' AND '${endDate}'` : 'TRUE'}
        AND
          ${status === 'accepted' ? `solicitudes.prestamo_id IS NOT NULL` : 'TRUE'}
        AND
          ${status === 'notAccepted' ? `solicitudes.prestamo_id IS NULL` : 'TRUE'}
      `
    )

    const { total } = count[0]

    return { total, page, perPage, data }
  }

  async getPacCustomerScoreReportFile ({ id, status, startDate, endDate }: getPacCustomerCreditReportFileDTO): Promise<any> {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        dbName: true
      }
    })

    if (!customer) return null

    const { name, dbName } = customer

    if (!dbName) return null

    const mysql = require('mysql2/promise')

    const dbUrl = dbName === 'telcelint_core'
      ? process.env.TELCEL_DATABASE_URL
      : process.env.PACS_DATABASE_URL_WITHOUT_DBNAME?.concat(dbName)

    const connection = await mysql.createConnection(dbUrl)

    const [data] = await connection.execute(
      `
      SELECT solicitudes.prestamo_id AS creditId,
        credolab.reference_number AS reference,
        solicitudes.id AS requestId,
        solicitudes.sys_fecha_alta AS requestDate,
        CASE
          WHEN solicitudes.prestamo_id IS NULL THEN 'No aceptado'
          ELSE 'Aceptado'
        END AS status,
        credolab.dataset->>'$.scores[0].value' AS score,
        CASE
          WHEN devicesUsedMoreThanOnce.count IS NOT NULL THEN 'Si'
          ELSE 'No'
        END AS previouslyValidatedDevice,
        credolab.dataset->>'$.fragments[0].value.deviceID' AS deviceId
      FROM ${dbName}.solicitudes
        INNER JOIN ${dbName}.credolab ON solicitudes.id = credolab.solicitud_id
        LEFT JOIN (
          SELECT credolab.dataset->>'$.fragments[0].value.deviceID' AS deviceId,
            COUNT(*) AS count
          FROM ${dbName}.credolab
          GROUP BY deviceId
          HAVING count > 1
        ) AS devicesUsedMoreThanOnce ON devicesUsedMoreThanOnce.deviceId = credolab.dataset->>'$.fragments[0].value.deviceID'
      WHERE
        ${startDate && endDate ? `DATE(solicitudes.sys_fecha_alta) BETWEEN '${startDate}' AND '${endDate}'` : 'TRUE'}
      AND
        ${status === 'accepted' ? `solicitudes.prestamo_id IS NOT NULL` : 'TRUE'}
      AND
        ${status === 'notAccepted' ? `solicitudes.prestamo_id IS NULL` : 'TRUE'}
      `
    )

    if (data.length === 0) return null

    const XLSX = require('xlsx')

    const heading = [['Número de crédito', 'Referencia', 'No. Solicitud', 'Fecha', 'Estado', 'Score', 'Dispositivo validado previamente', 'ID de dispositivo']];

    const workBook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte')
    XLSX.utils.sheet_add_aoa(workSheet, heading, { origin: 'A1' });

    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    const fileName = `Reporte Score PAC - ${name}.xlsx`

    return { buffer, fileName }
  }
}
