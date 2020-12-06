import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Spinner from '../components/spinner';
import UserForm from '../forms/UserForm';
import UserEditForm from '../forms/UserEditForm';
import { sagaUsersLoad, sagaUserCreateNew } from '../services/sagaActions';

const UsersPage = ({
  users: userList,
  currentUser: curUser,
  editedUser: edited
}) => {
  if (userList.length === 0) {
    sagaUsersLoad();
  }
  function module() {
    return edited
      ? <UserEditForm edited={edited} />
      : (
        <div className="postpage">
          <div>
            <Button
              type="button"
              color="blue"
              style={{ marginTop: '25px', marginLeft: '10px' }}
              onClick={sagaUserCreateNew}
            >
              <Icon name="address book o" size="large" />
              Create New User
            </Button>
          </div>
          <div>
            {userList.map(item => (
              <UserForm
                user={item}
                current={curUser}
              />
            ))}
          </div>
        </div>
      );
  }
  return (
    (userList.length > 0)
      ? module()
      : <Spinner />
  );
};

UsersPage.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  users: PropTypes.arrayOf(PropTypes.object),
  editedUser: PropTypes.arrayOf(PropTypes.object)
};

UsersPage.defaultProps = {
  currentUser: {},
  users: [],
  editedUser: undefined
};

const mapStateToProps = store => ({
  users: store.users.users,
  currentUser: store.users.currentUser,
  editedUser: store.users.editedUser
});

export default connect(
  mapStateToProps
)(UsersPage);
