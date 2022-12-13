import MainScreen from '../../pages/main-screen/main-screen';
import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PrivateRoute from '../private-route/private-route';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading/loading';
import { getFilmsStatus } from '../../store/films-data/selectors';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmsLoading = useAppSelector(getFilmsStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked || isFilmsLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
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
          element={<MovieScreen />}
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
    </HelmetProvider>
  );
}

export default App;
