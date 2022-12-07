export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Movie = '/films',
  AddReview = '/review',
  Player = '/player',
  NotFound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum TabValue {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

export enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
}

export const GENRE_DEFAULT = 'All Genres';

export const SHOW_MORE_COUNT = 4;
