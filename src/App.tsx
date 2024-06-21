import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Layout from './Components/Layout/Layout';
import Recipes from './Pages/Recipes/Recipes';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import Favorites from './Pages/Favorites/FavoriteRecipes';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Layout /> }>
        <Route index element={ <Recipes /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      </Route>
      <Route path="/drinks" element={ <Layout /> }>
        <Route index element={ <Recipes /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      </Route>
      <Route path="/profile" element={ <Layout /> }>
        <Route index element={ <Profile /> } />
      </Route>
      <Route path="/done-recipes" element={ <Layout /> }>
        <Route index element={ <DoneRecipes /> } />
      </Route>
      <Route path="/favorite-recipes" element={ <Layout /> }>
        <Route index element={ <Favorites /> } />
      </Route>
    </Routes>
  );
}

export default App;
