import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import ReturnToHomeButton from '../../Components/ReturnToHomeButton/ReturnToHomeButton';
import styles from './Profile.module.css';

function Profile() {
  const { setHeaderTitle, setUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setHeaderTitle('Profile');
    setUrl(pathname);
  }, []);

  const logoutBtn = () => {
    localStorage.clear();
    navigate('/');
  };

  const getEmailFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).email : '';
  };

  return (
    <section className={ styles.profilePage }>
      <ReturnToHomeButton />
      <div className={ styles.infoDiv }>
        <h1>
          Profile
        </h1>
        <h2 data-testid="profile-email">
          {getEmailFromLocalStorage()}
        </h2>
      </div>
      <div className={ styles.btnsDiv }>
        <button
          className={ styles.buttons }
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
        <br />
        <button
          className={ styles.buttons }
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <br />
        <button
          className={ styles.buttons }
          data-testid="profile-logout-btn"
          onClick={ () => logoutBtn() }
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Profile;
