import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { filmMock, reviewsMock } from '../../mocks/moks';
import MovieTabs from './movie-tabs';


const history = createMemoryHistory();
const film = filmMock;
const reviews = reviewsMock;
describe('Component: FilmTabs', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <MovieTabs film={film} reviews={reviews}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Overview/)).toBeInTheDocument();
    expect(screen.getByText(/Details/)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
  });
});
