import MainScreen from '../../pages/main-screen/main-screen';
import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AuthorizationStatus, AppRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PrivateRoute from '../private-route/private-route';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import { getAuthorization, getLoading } from '../../selectors';
import LoadingScreen from '../loading/loading';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';


type AppScreenProps = {
  title: string;
  genre: string;
  releaseYear: number;
}

function App(props: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorization);
  const isLoading = useAppSelector(getLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
