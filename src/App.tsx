import './App.css';
import Layout from './components/Layout/Layout';
import UserProvider from './context/UserContext';
import ProfileProvider from './context/ProfileContext';

export default function App() {

  return (
    <UserProvider>
      <ProfileProvider>
        <Layout />
      </ProfileProvider>
    </UserProvider>
  );
}