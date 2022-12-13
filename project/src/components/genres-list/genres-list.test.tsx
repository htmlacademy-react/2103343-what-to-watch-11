import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { filmsMock } from '../../mocks/moks';
import GenresList from './genres-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const films = filmsMock;
const genre = 'Drama';
const store = mockStore({
  DATA: { films: films },
  FILMS: {genre: genre}
});
describe('Component: GenresList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenresList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId('genre').length).toBe(films.length + 1);
    expect(screen.getByText(films[0].genre)).toBeInTheDocument();
    expect(screen.getByText(films[1].genre)).toBeInTheDocument();
    expect(screen.getByText(/All genre/)).toBeInTheDocument();
  });
});
