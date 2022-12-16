import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();
describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundScreen />
        </HelmetProvider>
      </HistoryRouter>
    );

    expect(screen.getByText(/404. Page not found/)).toBeInTheDocument();
  });
});
