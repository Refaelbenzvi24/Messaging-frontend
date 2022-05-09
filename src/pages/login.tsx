import {Col, Row} from "../components/UI/Grid";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../services"
import {User} from "../modules/Entities/User";
import {LoginResult} from "../services/Auth/types";
import {useFormik} from "formik";
import * as Yup from "yup";
import TextField from "../components/UI/Form/TextField";
import {useAuth} from "../context";
import {useEffect} from "react";
import {TokenStorage} from "../modules/TokenStorage";


export default () => {
	const {t} = useTranslation()
	const navigate = useNavigate()
	const {setIsAuthenticated} = useAuth()
	
	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			navigate("/")
		}
	}, [])
	
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t('email invalid'))
				.required(t('email required'))
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			const {email, password} = values
			
			const result = await auth.login(email, password)
			User.storeUserData(result.data as LoginResult)
			setIsAuthenticated(true)
			navigate('/')
		}
	})
	
	return (
		<Row className="w-full h-full justify-center">
			<Col>
				<Row>
					<Col>
						<h1 className="text-6xl p-5 text-center">
							Messaging App
						</h1>
					</Col>
				</Row>
				
				<Row className="w-full justify-center">
					<Col className="pt-80 w-full">
						<form onSubmit={formik.handleSubmit}>
							<TextField id="email"
							           className="w-[60%] m-auto"
							           placeholder={t('email')}
							           value={formik.values.email}
							           onChange={formik.handleChange}
							           onBlur={() => formik.validateField('email')}
							           error={formik.errors.email}/>
							
							<TextField id="password"
							           className="pt-2 w-[60%] m-auto"
							           placeholder={t("Password")}
							           onChange={formik.handleChange}
							           value={formik.values.password}
							           type="password"/>
							
							<div className="w-full flex justify-center pt-2">
								<button className="w-40 h-10 py-1 px-3 mx-3 bg-gray-200 dark:bg-dark-400 opacity-95
		          rounded-md shadow-sm focus:outline-none active:bg-gray-100 dark:active:bg-dark-600" type="submit">
									{t("Login")}
								</button>
							</div>
						</form>
						
						<div className="place-self-center pt-1 text-gray-400">
							{t("don't have a user?")}
							<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/signup"> {t('sign up!')}</Link>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}
