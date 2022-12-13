import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { filmMock } from '../../mocks/moks';
import AddReview from './add-review';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const film = filmMock;

const store = mockStore({
  DATA: { film: film }
});
describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Post/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(10);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
