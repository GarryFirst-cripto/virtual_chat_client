import React from 'react';
import { Comment as CommentUI, Label, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getUserImgLink } from '../helpers/imageHelper';
import { showModal, oK } from '../modal';
import { sagaUserEdit, sagaUserDelete } from '../services/sagaActions';
import styles from './post.styles.scss';

const delMess = 'Do yor want to DELETE this comment ?';

const UserForm = ({ user, current }) => {
  const {
    id,
    username,
    status,
    editedAt,
    createdAt
  } = user;

  function delUser(idd) {
    const doDelete = message => { if (message === oK) sagaUserDelete(idd); };
    showModal(delMess, true, doDelete);
  }

  function ownButtons() {
    return [
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => sagaUserEdit(id)}>
        <Icon name="edit" />
        Edit
      </Label>
    ];
  }

  function alienButtons() { // eslint-disable-line
    return [ // eslint-disable-line
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => sagaUserEdit(id)}>
        <Icon name="edit" />
        Edit
      </Label>,
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => delUser(id)}>
        <Icon name="trash" />
        Delete
      </Label>
    ];
  }

  return (
    <CommentUI
      style={{
        margin: '10px',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '5px',
        fontSize: '18px',
        backgroundColor: id === current.id ? '#a3d3ab' : 'white'
      }}
    >
      <Image
        className={styles.postImage}
        src={getUserImgLink(user)}
        style={{ position: 'relative', float: 'left', width: '50px', height: '50px' }}
        alt="image"
      />
      <div style={{ position: 'relative', float: 'left', fontSize: '20px', marginLeft: '10px' }}>
        {username}
      </div>
      <div style={{ clear: 'both', marginLeft: '50px' }}>
        {status ? ` ( ${status} )` : undefined}
      </div>
      <div style={{ marginLeft: '50px', marginBottom: '10px' }}>
        Created :
        {' '}
        {moment(createdAt).fromNow()}
        {editedAt ? `Edited : ( edit : ${moment(createdAt).fromNow()} )` : undefined}
      </div>
      <div style={{ marginLeft: '50px' }} />
      <div>
        {id === current.id ? ownButtons() : alienButtons()}
      </div>
    </CommentUI>
  );
};

UserForm.propTypes = {
  current: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UserForm;
