import { forwardRef, useImperativeHandle, useState } from 'react';

// Call forwardRef() to let your component receive a ref and forward it to a child component
// This way the component can access the ref that is assigned to it
export default forwardRef(function Togglable(props, refs) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  function toggleVisible() {
    setVisible(!visible);
  }

  // useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref
  // it makes toggleVisibility function available outside of the component
  useImperativeHandle(refs, () => {
    return {
      // our ref.current will have toggleVisible
      toggleVisible,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible} data-cy="newBlogButton">
          new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  );
});
