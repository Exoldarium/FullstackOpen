import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'ZERO'
    }

    const newState = counterReducer(state, action);
    expect(newState).toEqual(undefined);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
      payload: {
        good: 0
      }
    }
    let add = 0;
    const state = {
      ...initialState,
      good: add++
    }

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
      payload: {
        ok: 0
      }
    }
    let add = 0;
    const state = {
      ...initialState,
      ok: add++
    }

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
      payload: {
        bad: 0
      }
    }
    let add = 0;
    const state = {
      ...initialState,
      bad: add++
    }

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    });
  });

  test('reset returns initial state', () => {
    const action = {
      type: 'RESET'
    }

    const state = initialState;
    const newState = counterReducer(state, action);

    expect(newState).toEqual(initialState)
  })
});