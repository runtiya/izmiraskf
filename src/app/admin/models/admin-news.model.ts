export interface NewsModel {
  id: number;
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  title: string;
  content: Text;
  imagePath: string,
  imageAttachment: File,
  isVisible: boolean;
}
