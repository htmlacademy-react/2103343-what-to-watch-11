import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { filmMock } from '../../mocks/moks';
import MovieOverview from './movie-overview';

const history = createMemoryHistory();
const film = filmMock;
describe('Component: FilmTabOverview', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <MovieOverview film={film} />
      </HistoryRouter>
    );

    const ratings = `${film.scoresCount} ratings`;
    const director = `Director: ${film.director}`;
    const starring = `Starring: ${film.starring.join(', ')} and other`;

    expect(screen.getByText(film.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(ratings)).toBeInTheDocument();
    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(director)).toBeInTheDocument();
    expect(screen.getByText(starring)).toBeInTheDocument();
  });
});
