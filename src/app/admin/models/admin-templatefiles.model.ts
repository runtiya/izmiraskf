export interface TemplateFilesModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  documentName: string,
  fileName: string,
  fileMimeType: string,
  fileSize: number,
  filePath: string,
  fileAttachment: File,
  category: string,
  templateType: string
}
