import { user } from '../UserContext';

describe('getLoggedUserId', () => {
  it('should return logged user id', () => {
    const expected = 1;

    expect(user()).toEqual(expected);
  });
});
