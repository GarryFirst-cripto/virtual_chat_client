import { history } from '../store/store';

const NotFound = () => {
  history.push('/login');
  return null;
};

export default NotFound;
