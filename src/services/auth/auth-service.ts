import validateToken from './validate-token';
import authenticate from './authenticate';

class AuthService {
  static authenticate = authenticate;
  static validateToken = validateToken;
}

export default AuthService;