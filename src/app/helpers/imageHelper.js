import callWebApi from './apiHelper';

export const getUserImgLink = user => (user.avatar
  ? user.avatar
  : 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png');

export const uploadImage = async image => {
  try {
    const response = await callWebApi({
      endpoint: '/users/image',
      type: 'POST',
      attachment: image
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
