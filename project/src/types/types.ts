export type FilmType = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type Films = FilmType[];

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type Reviews = ReviewType[];

export type AddReviewType = {
  rating: number;
  comment: string;
};

export type ReviewFormData = {
  rating: number;
  comment: string;
};
