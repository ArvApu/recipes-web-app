import axios from 'axios';
import { create } from 'pkce';
import SessionService from './session.service'

class AuthService {

  static AUTHORIZATION_URI = process.env.VUE_APP_AUTH_SERVER_BASE_URL + '/authorize' ;
  static TOKEN_URI         = process.env.VUE_APP_AUTH_SERVER_BASE_URL + '/api/token';
  static REDIRECT_URI      = process.env.VUE_APP_BASE_URL + '/auth/callback';
  static CLIENT_ID         = process.env.VUE_APP_CLIENT_ID;

  async login() {
    const codePair = create();
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const authUrl = new URL(AuthService.AUTHORIZATION_URI);

    authUrl.search = new URLSearchParams({
      response_type: 'code',
      client_id: AuthService.CLIENT_ID,
      redirect_uri: AuthService.REDIRECT_URI,
      state: state,
      code_challenge: codePair.codeChallenge,
      code_challenge_method: 'S256'
    });
    
    SessionService.putCodeVerifier(state, codePair.codeVerifier);

    window.location.href = authUrl;
  }

  async getToken() {
    console.log(AuthService.AUTHORIZATION_URI, AuthService.TOKEN_URI, AuthService.REDIRECT_URI, AuthService.CLIENT_ID);

    const params = new URLSearchParams(window.location.search);
    
    if(!params.has('code') && !params.has('state')) {
      return Promise.reject({ status: 401 });
    }

    const code = params.get('code');
    const state = params.get('state');
    const codeVerifier = SessionService.popCodeVerifier(state);

    if(!codeVerifier) {
      return Promise.reject({ status: 401 });
    }

    try {

      const response = await axios.post(AuthService.TOKEN_URI, {
        grant_type: 'authorization_code',
        client_id: AuthService.CLIENT_ID,
        redirect_uri: AuthService.REDIRECT_URI,
        code: code,
        state: state,
        code_verifier: codeVerifier
      });

      SessionService.setAccessToken(response.data.access_token);
      SessionService.setRefreshToken(response.data.refresh_token);
      
      return Promise.resolve(response.data)
    } catch(error) {
      return Promise.reject(error);
    }
  }
}

export default new AuthService();