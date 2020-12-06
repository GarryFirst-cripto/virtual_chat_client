import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from '../components/tabs.component';
import createPostForm from '../forms/PostForm';
import AddPost from '../forms/addPostForm';
import EditPostForm from '../forms/EditPostForm';
import { sagaPostLike, sagaPostDislike } from '../services/sagaActions';
import './postpage.styles.css';

function dataText(data) {
  return new Date(data).toLocaleDateString();
}

const PostsTabb = ({
  posts: postList,
  currentUser: user,
  editedPost: edited
}) => {
  const pages = [];
  const datas = [];
  let list = [];
  let dataPage = '';

  postList.forEach(post => {
    const dataPost = dataText(post.createdAt);
    if (dataPost !== dataPage) {
      if (list.length > 0) {
        pages.push(list);
        datas.push(dataPage);
      }
      dataPage = dataText(post.createdAt);
      list = [];
    }
    list.push(createPostForm(post, user, sagaPostLike, sagaPostDislike));
  });
  pages.push(list);
  datas.push(dataPage);

  return (
    <div className="postpage">
      {edited && (
        <EditPostForm
          comment={edited}
        />
      )}
      {!edited && (
        <>
          <div>
            <AddPost currentUser={user} />
          </div>
          <Tabs>
            {pages.map((page, index) => (
              <div label={datas[index]}>
                {page}
              </div>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
};

const PostsPage = ({
  posts,
  currentUser,
  editedPost
}) => {
  if (posts) {
    return PostsTabb({ posts, currentUser, editedPost });
  }
  return null;
};

PostsTabb.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  posts: PropTypes.arrayOf(PropTypes.object),
  editedPost: PropTypes.arrayOf(PropTypes.object)
};

PostsTabb.defaultProps = {
  currentUser: {},
  posts: [],
  editedPost: undefined
};

PostsPage.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  posts: PropTypes.arrayOf(PropTypes.object),
  editedPost: PropTypes.objectOf(PropTypes.any)
};

PostsPage.defaultProps = {
  currentUser: {},
  posts: [],
  editedPost: undefined
};

const mapStateToProps = store => ({
  posts: store.posts.posts,
  currentUser: store.users.currentUser,
  editedPost: store.posts.editedPost
});

export default connect(
  mapStateToProps
)(PostsPage);
