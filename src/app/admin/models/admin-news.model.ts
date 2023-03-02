export interface NewsModel {
  id: number;
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  title: string;
  content: string;
  newsImage: File;
  isOnline: boolean;
}
