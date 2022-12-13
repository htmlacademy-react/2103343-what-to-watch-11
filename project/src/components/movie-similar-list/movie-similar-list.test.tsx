import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { filmsMock } from '../../mocks/moks';
import MovieSimilarList from './movie-similar-list';

const history = createMemoryHistory();
const films = filmsMock;
describe('Component: FilmsList', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <MovieSimilarList films={films} />
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('film').length).toBe(films.length);
  });
});
