import type { ThemeName } from '../components/UI/Theme/types'
import type { Language } from '../plugins/i18n'
import { MessagesProps } from "./Entities/Messages"


export class LocalStorage {
	static THEME    = 'theme'
	static MESSAGES = 'messages'
	static LANGUAGE = 'i18nextLng'

	static getTheme(): ThemeName | undefined {
		const theme = localStorage.getItem(LocalStorage.THEME)
		return theme as ThemeName | undefined
	}

	static setTheme(theme: boolean | string): void {
		localStorage.setItem(LocalStorage.THEME, theme.toString())
	}

	static getMessages(): MessagesProps[] {
		const messages = localStorage.getItem(LocalStorage.MESSAGES)

		if (messages) {
			return JSON.parse(messages)
		}

		return []
	}

	static getLanguage(): Language {
		const language = localStorage.getItem(LocalStorage.LANGUAGE)
		return language as Language
	}

	static setMessages(messages: MessagesProps[]): void {
		localStorage.setItem(LocalStorage.MESSAGES, JSON.stringify(messages))
	}

	static setLanguage(language: Language): void {
		localStorage.setItem(LocalStorage.LANGUAGE, language)
	}
}

export default {}
