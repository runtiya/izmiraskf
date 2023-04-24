export interface DocumentsModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  docName: string,
  content: File,
  mimeType: string,
  category: string,
  orderNo: number
}
