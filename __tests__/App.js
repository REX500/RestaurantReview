import 'react-native';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render, fireEvent, screen, cleanup } from 'react-native-testing-library';

// components
import TimeStamp from 'components/restaurant/restaurantInfo/components/restaurantReviews/components/review/components/reviewHeader/components/timeStamp/timeStamp';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

describe('Testing review components', () => {
  afterEach(() => {
    cleanup();
  });

  test('testing timeStamp: should show published', () => {
    const date = {
      createdAt: '2020-04-03T17:37:51',
      updatedAt: '2020-04-03T17:37:51',
    };
    
    // how values should look
    const shownValues = {
      // published because createdAt/updateAt are the same
      text: 'Published on:',
      date: 'Apr 3rd, 2020'
    };
  
    const { getByText } = render(<TimeStamp date={date} />);

    const firstElement = getByText(shownValues.text);
    const secondElement = getByText(shownValues.date);
    
    expect(firstElement).toBeTruthy();
    expect(secondElement).toBeTruthy();
  });

  test('testing timeStamp: should show updated', () => {
    const date = {
      createdAt: '2020-04-03T17:37:51',
      updatedAt: '2020-04-05T17:37:51',
    };
    
    // how values should look
    const shownValues = {
      // updated because createdAt/updateAt are not the same
      text: 'Updated on:',
      date: 'Apr 5th, 2020'
    };
  
    const { getByText } = render(<TimeStamp date={date} />);

    const firstElement = getByText(shownValues.text);
    const secondElement = getByText(shownValues.date);
    
    expect(firstElement).toBeTruthy();
    expect(secondElement).toBeTruthy();
  });
});

