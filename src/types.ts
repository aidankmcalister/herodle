export interface Hero {
  id: number;
  name: string;
  gender: string;
  species: string;
  role: string;
  rangeType: string;
  firstAppearance: string;
  year: number;
  image: string;
  isNewest?: boolean;
  primaryColor: string;
}
