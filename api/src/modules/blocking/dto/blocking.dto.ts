import { NuovoReport } from '@prisma/client'

export interface PaginationFilterDTO {
  perPage?: number;
  page?: number;
  q?: string;
  pagination?: boolean;
}

export interface PaginationFilterResponseDTO {
  total?: number
  page?: number
  perPage?: number
  data: any[]
}


export interface CreateBlockingReportDTO {
  files: Express.Multer.File[]
  truncate: string
  reportedAt: string
}

export interface CreateBlockingReportResponseDTO {
  id: string
}

export interface ListBlockingReportDTO extends PaginationFilterDTO {
  fields?: string[]
  includeConsolidated?: boolean
}


// export interface ListBlockingReportResponseDTO extends PaginationFilterResponseDTO {
//   data: Prisma.NuovoReportWhereInput[]
// }

export interface ListBlockingReportResponseDTO extends PaginationFilterResponseDTO {
  data: Partial<NuovoReport>[] & {
    isConsolidated?: boolean
    isLatestImported?: boolean
  }
}
