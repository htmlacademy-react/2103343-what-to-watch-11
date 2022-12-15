import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { reviewsMock } from '../../mocks/moks';
import MovieReviews from './movie-reviews';

const history = createMemoryHistory();
const reviews = reviewsMock;
describe('Component: FilmTabReviews', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <MovieReviews reviews={reviews} />
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('review').length).toBe(reviews.length);
  });
});
