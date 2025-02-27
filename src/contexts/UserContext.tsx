// UserContext.tsx
import {createContext, ReactNode, useState} from 'react';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {AuthContextType, Credentials} from '../types/localtypes';
import {UserResponse} from 'hybrid-types/MessageTypes';
import {AsyncStorage} from 'react-native';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials: Credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      console.log('doLogin result', loginResult);
      if (loginResult) {
        await AsyncStorage.setItem('token', loginResult.token);
      }
      setUser(loginResult.user);
      // TODO nav home
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      AsyncStorage.removeItem('token');
      setUser(null);
      // TODO nav home
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const userResponse: UserResponse = await getUserByToken(token);
      setUser(userResponse.user);
      const origin = location.state.from.pathname || '/';
      navigate(origin);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider value={{user, handleLogin, handleLogout, handleAutoLogin}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
