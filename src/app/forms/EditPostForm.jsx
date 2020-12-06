import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Segment } from 'semantic-ui-react';
import { sagaWritePost } from '../services/sagaActions';
import { showModal } from '../modal';

const EditPostForm = ({ comment }) => {
  const [body, setBody] = useState(comment.text);
  const [isLoading, setLoading] = useState(false);

  function toggleEnd(logg) {
    if (logg === false) {
      showModal('Error writing post !');
    }
    setLoading(false);
  }

  function toggleEdit() {
    setLoading(true);
    const { id } = comment;
    const text = body;
    sagaWritePost({ id, text }, toggleEnd);
  }

  const elem = document.getElementById('commbody');
  if (elem) setTimeout(() => elem.focus(), 10);
  return (
    <Form name="loginForm" size="large" onSubmit={toggleEdit}>
      <Segment>
        <Form onSubmit={toggleEdit}>
          <Form.TextArea
            id="commbody"
            rows="6"
            name="body"
            value={body}
            placeholder="What is the news?"
            onChange={ev => {
              setBody(ev.target.value);
            }}
          />
          <Button loading={isLoading} floated="right" color="blue" type="submit">
            <Icon name="edit" />
            Save Post
          </Button>
        </Form>
      </Segment>
    </Form>
  );
};

EditPostForm.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired
};

export default EditPostForm;
