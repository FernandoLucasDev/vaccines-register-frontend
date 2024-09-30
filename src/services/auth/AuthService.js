import Api from '../api/Api';
import Cookies from 'js-cookie';
import { validateEmail, validatePassword } from '../validators/Validators';

const AuthService = {

  login: async (email, password) => {

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid || !passwordValid) {
      return { success: false, message: 'Invalid email or password format.' };
    }

    const route = 'api/login';
    const data = {
      email,
      password,
    };

    try {
      const response = await Api.post(route, data);
      if (response.token) {
        Cookies.set('authToken', response.token.split('|')[1], { expires: 7 });
        window.location.href = '/';
        return { success: true };
      } else {
        return { success: false, message: 'Token not returned from server.' };
      }
    } catch (error) {
      return { success: false, message: error || 'Login failed.' };
    }
  },

  logout: () => {
    Cookies.remove('authToken');
    window.location.href = '/login';
  },

  getToken: () => {
    return Cookies.get('authToken');
  },
};

export default AuthService;
