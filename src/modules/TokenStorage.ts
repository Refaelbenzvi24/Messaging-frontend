import {auth} from "../services";
import {LocalStorage} from "./LocalStorage";


export class TokenStorage {
	
	static accessToken                 = ''
	static LOCAL_STORAGE_TOKEN         = 'token'
	static LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token'
	static LOCAL_USER_EMAIL            = 'user_email'
	static LOCAL_USER_NAME             = 'user_name'
	static LOCAL_USER_ID               = 'user_id'
	static LOCAL_PUBLIC_ID = 'public_id'
	
	
	
	static async isAuthenticated() {
		return this.getRefreshToken()
	}
	
	static hasRefreshToken() {
		return this.getRefreshToken() !== null
	}
	
	static async getAuthentication() {
		return {
			headers: {'Authorization': 'Bearer ' + await this.getToken()},
		}
	}
	
	static async getAuthenticationObject() {
		return {'Authorization': 'Bearer ' + await this.getToken()}
	}
	
	static async checkForToken() {
		if (TokenStorage.getRefreshToken()) {
			await auth.refreshToken()
		}
	}
	
	
	static storeToken(token: string) {
		TokenStorage.accessToken = token
	}
	
	static storeRefreshToken(refreshToken: string) {
		localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken)
	}
	
	static storeUserEmail(userEmail: string) {
		localStorage.setItem(TokenStorage.LOCAL_USER_EMAIL, userEmail)
	}
	
	static storeUserName(userName: string) {
		localStorage.setItem(TokenStorage.LOCAL_USER_NAME, userName)
	}
	
	static storeUserId(userId: string) {
		localStorage.setItem(TokenStorage.LOCAL_USER_ID, userId)
	}
	
	static storePublicId(publicId: string) {
		localStorage.setItem(TokenStorage.LOCAL_PUBLIC_ID, publicId)
	}
	
	static getRefreshToken() {
		return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN)
	}
	
	static async getToken() {
		if (TokenStorage.accessToken) {
			return TokenStorage.accessToken
		} else {
			return await auth.refreshToken()
		}
	}
	
	static getUserEmail(): string {
		return localStorage.getItem(TokenStorage.LOCAL_USER_EMAIL) || ""
	}
	
	static getUserName(): string {
		return localStorage.getItem(TokenStorage.LOCAL_USER_NAME) || ""
	}
	
	static getUserId(): string {
		return localStorage.getItem(TokenStorage.LOCAL_USER_ID) || ""
	}
	
	static getPublicId(): string {
		return localStorage.getItem(TokenStorage.LOCAL_PUBLIC_ID) || ""
	}
}
