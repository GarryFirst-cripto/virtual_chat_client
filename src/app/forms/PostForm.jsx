import React from 'react';
import { Comment as CommentUI, Label, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import { formatString } from '../services/stringService';
import { getUserImgLink } from '../helpers/imageHelper';
import { sagaDelPost, sagaEditPost } from '../services/sagaActions';
import { showModal, oK } from '../modal';
import styles from './post.styles.scss';

const likeMess = 'Your can`t like or dislike own comment ....';
const delMess = 'Do yor want to DELETE this comment ?';

const createPostForm = (post, user, likeCom, dislikeCom) => {
  const {
    id,
    text: body,
    updatedAt,
    createdAt,
    userId,
    username,
    status,
    likes: likeCou,
    dislikes: dislikeCou
  } = post;
  function delComment(idd) {
    const doDelete = message => { if (message === oK) sagaDelPost(idd); };
    showModal(delMess, true, doDelete);
  }

  function ownLikeLabels() {
    return [
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => showModal(likeMess)}>
        <Icon name="thumbs up" />
        {likeCou}
      </Label>,
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => showModal(likeMess)}>
        <Icon name="thumbs down" />
        {dislikeCou}
      </Label>,
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => sagaEditPost(id)}>
        <Icon name="edit" />
        Edit
      </Label>,
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => delComment(id)}>
        <Icon name="trash" />
        Delete
      </Label>
    ];
  }

  function alienLikeLabels() { // eslint-disable-line
    return [ // eslint-disable-line
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => likeCom(id, user.id)}>
        <Icon name="thumbs up" />
        {likeCou}
      </Label>,
      <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => dislikeCom(id, user.id)}>
        <Icon name="thumbs down" />
        {dislikeCou}
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
        backgroundColor: userId === user.id ? '#a3d3ab' : 'white'
      }}
    >
      <Image
        className={styles.postImage}
        src={getUserImgLink(post)}
        style={{ position: 'relative', float: 'left', width: '50px', height: '50px' }}
        alt="image"
      />
      <div style={{ position: 'relative', float: 'left', fontSize: '20px', marginLeft: '10px' }}>
        {username}
        <br />
        {status ? ` ( ${status} ) ` : undefined}
        <br />
        {moment(createdAt).fromNow()}
        {updatedAt ? ` ( edit : ${moment(updatedAt).fromNow()} )` : undefined}
      </div>
      <div style={{ clear: 'both' }} />
      <div style={{ margin: '12px', padding: '10px', fontSize: '24px', backgroundColor: '#ddd' }}>
        {formatString(body)}
      </div>
      <div>
        {userId === user.id ? ownLikeLabels() : alienLikeLabels()}
      </div>
    </CommentUI>
  );
};

export default createPostForm;
