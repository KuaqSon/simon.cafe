export interface ICafeImage {
  url: string;
}

export interface ICafe {
  id: number;
  name: string;
  address: string;
  cover: string;
  images: ICafeImage[];
}
