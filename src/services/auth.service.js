import axios from 'axios';
import { create } from 'pkce';
import SessionService from './session.service'

class AuthService {
  constructor() {
    this.clientId = '91c7849b-db97-46d8-8275-0330e1a46a97';
    this.authorizationUri = 'http://localhost:8000/authorize';
    this.tokenUri = 'http://localhost:8000/api/token';
    this.redirectUri = 'http://localhost:8080/auth/callback';
  }

  async login() {
    const codePair = create();
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const authUrl = new URL(this.authorizationUri);

    authUrl.search = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: state,
      code_challenge: codePair.codeChallenge,
      code_challenge_method: 'S256'
    });
    
    SessionService.putCodeVerifier(state, codePair.codeVerifier);

    window.location.href = authUrl;
  }

  async getToken() {
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

      const response = await axios.post(this.tokenUri, {
        grant_type: 'authorization_code',
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
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