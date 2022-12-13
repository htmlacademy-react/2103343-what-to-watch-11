import { setGenre, filmsProcess } from './films-process';

describe('Reducer: filmsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmsProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ genre: 'All genre' });
  });

  it('should change genre', () => {
    const state = { genre: 'All genre' };
    expect(filmsProcess.reducer(state, setGenre('Drama')))
      .toEqual({ genre: 'Drama' });
  });
});
