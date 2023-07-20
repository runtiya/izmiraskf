export interface NewsModel {
  id: number;
  createdAt: Date | string,
  createdBy: number,
  updatedAt: Date | string,
  updatedBy: number,
  title: string;
  content: Text | string;
  imagePath: string,
  imageAttachment: File,
  isVisible: boolean;
}
