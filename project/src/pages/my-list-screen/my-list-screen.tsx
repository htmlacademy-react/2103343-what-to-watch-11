import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { getFavoriteFilms, getFavoriteFilmsStatus } from '../../store/films-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import LoadingScreen from '../../components/loading/loading';
import UserBlock from '../../components/user-block/user-block';
import MovieSimilarList from '../../components/movie-similar-list/movie-similar-list';

export default function MyListScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const films = useAppSelector(getFavoriteFilms);
  const isFavoriteLoading = useAppSelector(getFavoriteFilmsStatus);

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  if (isFavoriteLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>

        <UserBlock />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MovieSimilarList films={films} />

      </section>

      <Footer/>

    </div>
  );
}
