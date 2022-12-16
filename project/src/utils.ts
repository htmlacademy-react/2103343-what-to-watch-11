import { GENRE_DEFAULT } from './const';
import { FilmType } from './types/types';

export const getRatingCountToName = (rating: number) => {
  if (rating > 0 && rating < 3) {
    return 'Bad';
  } if (rating >= 3 && rating < 5) {
    return 'Normal';
  }
  if (rating >= 5 && rating < 8) {
    return 'Good';
  }
  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }
  if (rating === 10) {
    return 'Awesome';
  }
};

export const getGenres = (films: FilmType[]): string[] => {
  const genres = new Set(films.map((film) => film.genre));
  return [GENRE_DEFAULT, ...genres];
};

export const getFormatReviewDate = (date: string) => new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });

export const getTimeFromMins = (mins: number) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h  ${minutes}m`;
};

export const getFormatPlayerTime = (time: number) => {
  if (time >= 60) {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return `-${hours}:${minutes}:00`;
  } else {
    return `-${time}:00`;
  }
};
