import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TabValue } from '../../const';
import { FilmType, ReviewType } from '../../types/types';
import MovieDetails from '../movie-details/movie-details';
import MovieOverview from '../movie-overview/movie-overview';
import MovieReviews from '../movie-reviews/movie-reviews';

type MovieTabsProps = {
  movie: FilmType;
  reviews: ReviewType[];
}

export default function MovieTabs ({movie, reviews}: MovieTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(TabValue.Overview);

  const renderTab = () => {
    switch(activeTab) {
      case TabValue.Overview:
        return <MovieOverview movie={movie} />;
      case TabValue.Details:
        return <MovieDetails movie={movie} />;
      case TabValue.Reviews:
        return <MovieReviews reviews={reviews} />;
      default :
        return <MovieOverview movie={movie} />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === TabValue.Overview ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(TabValue.Overview)}>
            <Link to='#' className="film-nav__link">Overview</Link>
          </li>
          <li className={`film-nav__item ${activeTab === TabValue.Details ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(TabValue.Details)}>
            <Link to='#' className="film-nav__link">Details</Link>
          </li>
          <li className={`film-nav__item ${activeTab === TabValue.Reviews ? 'film-nav__item--active' : ''}`} onClick={() => setActiveTab(TabValue.Reviews)}>
            <Link to='#' className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      {renderTab()}
    </div >
  );
}
