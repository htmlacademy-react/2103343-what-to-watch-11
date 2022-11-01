import MainScreen from '../../pages/main-screen/main-screen';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PrivateRoute from '../private-route/private-route';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {FilmsType, ReviewType} from '../../types/types';

type AppScreenProps = {
  movies: FilmsType[];
  reviews: ReviewType[];
  title: string;
  genre: string;
  releaseYear: number;
}

function App(props: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen {...props}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<SignInScreen />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListScreen myMovies={props.movies}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Movie}/:id`}
          element={<MovieScreen movies={props.movies}/>}
        />
        <Route
          path={`${AppRoute.Movie}/:id${AppRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Player}/:id`}
          element={<PlayerScreen movies={props.movies} />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
