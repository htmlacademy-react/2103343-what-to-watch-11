import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { reviewsMock } from '../../mocks/moks';
import MovieReview from './movie-review';

const history = createMemoryHistory();
describe('Component: FilmReview', () => {
  it('should render correctly', () => {
    const review = reviewsMock[0];

    render(
      <HistoryRouter history={history}>
        <MovieReview review={review} />
      </HistoryRouter>
    );

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.rating.toString())).toBeInTheDocument();
  });
});
