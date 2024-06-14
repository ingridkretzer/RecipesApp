import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import profileIcon from '../../images/profileIcon.svg';

function Profile() {
  const { setHeaderTitle } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderTitle('Profile');
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
    <section>
      <img src={ profileIcon } alt="Icone do Perfil" />
      <h1>
        Profile
      </h1>
      <h2 data-testid="profile-email">
        {getEmailFromLocalStorage()}
      </h2>
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </button>
      <br />
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <br />
      <button
        data-testid="profile-logout-btn"
        onClick={ () => logoutBtn() }
      >
        Logout
      </button>
    </section>
  );
}

export default Profile;
