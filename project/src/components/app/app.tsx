import MainScreen from '../../pages/main-screen/main-screen';
import {Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PrivateRoute from '../private-route/private-route';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { ReviewType} from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilms } from '../../store/action';
import { getAuthorization, getFilms, getLoading } from '../../selectors';
import LoadingScreen from '../loading/loading';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { useEffect } from 'react';

type AppScreenProps = {
  reviews: ReviewType[];
  title: string;
  genre: string;
  releaseYear: number;
}

function App(props: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorization);
  const isLoading = useAppSelector(getLoading);
  const movies = useAppSelector(getFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilms(movies));
  }, [movies, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
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
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Movie}/:id`}
          element={<MovieScreen reviews={props.reviews}/>}
        />
        <Route
          path={`${AppRoute.Movie}/:id${AppRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Player}/:id`}
          element={<PlayerScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />

      </Routes>
    </HistoryRouter>
  );
}

export default App;
