export interface NewsModel {
  id: number;
  createdAt: Date | string,
  createdBy: number,
  createdByUsername: string,
  updatedAt: Date | string,
  updatedBy: number,
  updatedByUsername: string,
  title: string;
  content: Text | string;
  imagePath: string,
  imageAttachment: File,
  isVisible: boolean;
}
