import {Vars} from "../../../src/modules/vars"


describe("Vars", () => {
	const ENV = {
		VITE_APP_NAME: "Messaging-frontend",
		VITE_ENV: "test",
		VITE_DEFAULT_THEME: "light",
		VITE_API_URL: "http://localhost:3000",
		VITE_API_VERSION: "v1",
	}
	
	beforeEach(() => {
		Vars.setupVars(ENV)
	})
	
	it("should be defined", () => {
		expect(Vars).toBeDefined()
	})
	
	it("should contain all the variables", () => {
		expect(Vars.appName).toBe(ENV.VITE_APP_NAME)
		expect(Vars.theme.defaultTheme).toBe(ENV.VITE_DEFAULT_THEME)
	})
})
