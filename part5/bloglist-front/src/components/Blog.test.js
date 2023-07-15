import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  const fakeBlog = {
    author: 'fake author',
    title: 'fake title',
    id: 'fakeId',
    user: 'userId',
    likes: 3,
    url: 'fake url'
  }
  const fakeUser = {
    id: 'userId'
  }
  const mockAddLike = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={fakeBlog}
        user={fakeUser}
        addNewLike={mockAddLike}
      />
    ).container;
  });

  test('renders the author and the title', () => {
    const author = screen.getByText('fake author');
    const title = screen.getByText('fake title');
    const button = container.querySelector('.expandBlog');

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(button).toHaveTextContent('show');
  });

  test('URL and number of likes are shown when the button has been clicked', async () => {
    const user = userEvent.setup();
    const div = container.querySelector('.blogDiv');
    const likes = screen.getByText('likes 3');
    const url = screen.getByText('fake url');
    const button = container.querySelector('.expandBlog');

    await user.click(button);
    screen.debug(div);

    expect(likes).toBeDefined();
    expect(url).toBeDefined();
    expect(button).toHaveTextContent('hide');
  });

  test('the event handler is called twice after like button click', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('.likeButton');

    await user.click(button);
    await user.click(button);

    expect(mockAddLike).toHaveBeenCalledTimes(2);
  });
});