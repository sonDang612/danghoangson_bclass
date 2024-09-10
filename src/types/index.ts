export interface City {
  code: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
}

export interface Disctrict {
  code: string;
  name: string;
  slug: string;
  type: string;
  path: string;
  path_with_type: string;
  parent_code: string;
  name_with_type: string;
}

export interface Room {
  title: string;
  thumbnail: string;
  price: number;
  area: number;
  city: string;
  district: string;
  content: string;
}
