import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/base';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <>
    <Text></Text>
      {displayRegister ? <RegisterForm /> : <LoginForm />}
      <Button onPress={toggleRegister}> or {displayRegister ? 'login' : 'register'}? </Button>
    </>
  );
};

export default Login;
