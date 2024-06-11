import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Layout from './Components/Layout/Layout';
import Meals from './Pages/Meals/Meals';
import MealDetail from './Pages/MealDetail/MealDetail';
import Drinks from './Pages/Drinks/Drinks';
import DrinkDetails from './Pages/DrinkDetails/DrinkDetails';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import Favorites from './Pages/Favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Layout /> }>
        <Route index element={ <Meals /> } />
        <Route path="/meals/:id" element={ <MealDetail /> } />
      </Route>
      <Route path="/drinks" element={ <Layout /> }>
        <Route index element={ <Drinks /> } />
        <Route path="/drinks/:id" element={ <DrinkDetails /> } />
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
