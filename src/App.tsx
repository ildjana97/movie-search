import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import MovieSearch from './components/MovieSearch/MovieSearch';
import PersonalCollection from './components/PersonalCollection/PersonalCollection';
import { useUser } from './components/UserContext/UserContext';
import LoginForm from './components/Login/Login';


function UserProfile() {
  const { user, logout } = useUser();

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}



const App: React.FC = (props) => {
  return (
    <Router>
      <div className="App">
        <h1 style={{ fontFamily: 'Gilroy-Bold', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Movie Search App</h1>
        {/* <UserProfile /> */}
        <LoginForm/>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/personal-collection" element={<PersonalCollection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

