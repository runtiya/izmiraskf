export interface NewsModel {
  id: number;
  createdAt: Date,
  updatedAt: Date,
  title: string;
  content: Text;
  newsImage: File;
  isOnline: boolean;
}
