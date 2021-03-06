class SessionService {

    static ACCESS_TOKEN_STORAGE_KEY  = process.env.VUE_APP_ACCESS_TOKEN_STORAGE_KEY  || 'access_token';
    static REFRESH_TOKEN_STORAGE_KEY = process.env.VUE_APP_REFRESH_TOKEN_STORAGE_KEY || 'refresh_token';
    static CODE_VERIFIER_STORAGE_KEY = process.env.VUE_APP_CODE_VERIFIER_STORAGE_KEY || 'code_verifier';
    static USER_STORAGE_KEY          = process.env.VUE_APP_USER_STORAGE_KEY          || 'user_data';

    constructor() {
        this.storage = sessionStorage;
    }

    setAccessToken(token) {
        this.storage.setItem(SessionService.ACCESS_TOKEN_STORAGE_KEY, token);
    }

    getAccessToken() {
        return this.storage.getItem(SessionService.ACCESS_TOKEN_STORAGE_KEY);
    }

    setRefreshToken(token) {
        this.storage.setItem(SessionService.REFRESH_TOKEN_STORAGE_KEY, token);
    }

    getRefreshToken() {
        return this.storage.getItem(SessionService.REFRESH_TOKEN_STORAGE_KEY);
    }

    clearTokens() {
        this.storage.removeItem(SessionService.ACCESS_TOKEN_STORAGE_KEY);
        this.storage.removeItem(SessionService.REFRESH_TOKEN_STORAGE_KEY);
    }

    putCodeVerifier(state, codeVerifier) {
        sessionStorage.setItem(SessionService.CODE_VERIFIER_STORAGE_KEY + '_' + state, codeVerifier);
    }

    popCodeVerifier(state) {
        let codeVerifier = sessionStorage.getItem(SessionService.CODE_VERIFIER_STORAGE_KEY + '_' + state);
        sessionStorage.removeItem(SessionService.CODE_VERIFIER_STORAGE_KEY + '_' + state);
        return codeVerifier;
    }

    setUser(user) {
        this.storage.setItem(SessionService.USER_STORAGE_KEY, JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(this.storage.getItem(SessionService.USER_STORAGE_KEY));
    }

    clearUser() {
        this.storage.removeItem(SessionService.USER_STORAGE_KEY);
    }

    isAuthenticated() {
        return this.getAccessToken() !== null;
    }
}

export default new SessionService();