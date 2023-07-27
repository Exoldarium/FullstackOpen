import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AddNewBlog from './AddNewBlog';

describe('<AddNewBlog />', () => {
  test('a new blog is created successfully', async () => {
    let container;
    const mockAddNewBlog = jest.fn();
    const user = userEvent.setup();

    container = render(<AddNewBlog addNewBlog={mockAddNewBlog} />).container;

    const button = screen.getByText('add');
    const title = container.querySelector('.titleInput');
    const author = container.querySelector('.authorInput');
    const url = container.querySelector('.urlInput');

    await user.type(title, 'test title');
    await user.type(author, 'test author');
    await user.type(url, 'test url');
    await user.click(button);

    expect(mockAddNewBlog.mock.calls).toHaveLength(1);
    expect(mockAddNewBlog.mock.calls[0][0].title).toBe('test title');
    expect(mockAddNewBlog.mock.calls[0][0].author).toBe('test author');
    expect(mockAddNewBlog.mock.calls[0][0].url).toBe('test url');
  });
});
