export interface ImportBlockingDTO {
  files: Express.Multer.File[]
  truncate: string
}

export interface ImportBlockingResponseDTO {
  status: string
}
