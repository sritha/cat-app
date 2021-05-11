export interface CatInfo {
  favorite: number | null;
  votes: number;
}

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  original_filename: string;
  catInfo: CatInfo;
}
