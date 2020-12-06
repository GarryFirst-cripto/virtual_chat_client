import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Segment } from 'semantic-ui-react';
import { sagaCreateNewPost } from '../services/sagaActions';

const AddPost = ({ currentUser }) => {
  const [isLoading, setLoading] = useState(false);
  const [body, setBody] = useState('');

  const handleAddPost = () => {
    if (!body) {
      return;
    }
    setLoading(true);
    sagaCreateNewPost(currentUser, body);
    setLoading(false);
    setBody('');
  };

  return (
    <Segment>
      <Form onSubmit={handleAddPost}>
        <Form.TextArea
          name="body"
          value={body}
          placeholder="Add your own post ..."
          onChange={ev => setBody(ev.target.value)}
        />
        <Button primary size="large" floated="right" color="blue" type="submit" loading={isLoading}>
          <Icon name="edit" />
          Add Post
        </Button>
      </Form>
    </Segment>
  );
};

export default AddPost;

AddPost.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any)
};

AddPost.defaultProps = {
  currentUser: {}
};
