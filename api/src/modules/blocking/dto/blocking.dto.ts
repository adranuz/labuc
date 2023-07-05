export interface PaginationFilterDTO {
  perPage?: number;
  page?: number;
  q?: string;
}

export interface ImportBlockingDTO {
  files: Express.Multer.File[]
  truncate: string
}

export interface ImportBlockingResponseDTO {
  id: string
}

export type PublicImportsDTO = {
  total: number
  page: number
  perPage: number
  data: any[]
};
