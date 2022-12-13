import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { filmMock } from '../../mocks/moks';
import MovieDetails from './movie-details';



const history = createMemoryHistory();
const film = filmMock;
describe('Component: FilmTabDetails', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <MovieDetails film={film} />
      </HistoryRouter>
    );

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Released/)).toBeInTheDocument();
    expect(screen.getByText(film.director)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released.toString())).toBeInTheDocument();
  });
});
