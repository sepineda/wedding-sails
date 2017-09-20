export interface Section{
  id?: string;
  name: string;
  content: string;
  imageUrl?: string;
  imageFd?: string;
  active: boolean;
  category: number;
  _wedding: string;
}

export enum SectionCategories {
  Historia,
  Confirmar,
  Lugar
}
