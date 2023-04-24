export interface SeasonsModel {
  id: number;
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  seasonName: string;
  seasonYear: string;
  isActive: boolean;
}
