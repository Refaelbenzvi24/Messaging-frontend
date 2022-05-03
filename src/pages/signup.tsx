import {Link} from "react-router-dom"
import {Col, Row} from "../components/UI/Grid"
import {BaseSyntheticEvent, useState} from "react"
import {auth} from "../services"
import {User} from "../modules/Entities/User"
import {ApiResult, RegisterResult} from "../services/Auth/types"
import {useNavigate} from "react-router-dom"
import {useFormik} from "formik";
import * as Yup from 'yup';


export default () => {
	const {t} = useTranslation()
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.required(t('username_required')),
			email: Yup.string()
				.email(t('email_invalid'))
				.required(t('email_required')),
			password: Yup.string()
				.min(6, t('password_min_length'))
				.required(t('password_required'))
		}),
		onSubmit: async (values) => {
			const {username, email, password} = values
			
			const result = await auth.register(email, username, password)
			User.storeUserData(result.data as RegisterResult)
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
							<div className="w-full flex justify-center p-1">
								<input placeholder={t("Email")}
								       id="email"
								       onChange={formik.handleChange}
								       value={formik.values.email}
								       className="w-[60%] h-13 py-2 px-3 border border-2 border-gray-200 bg-gray-50 dark:bg-dark-800 dark:border-dark-400
		          rounded-md shadow-sm focus:outline-none focus:ring-transparent focus:border-gray-300 dark:focus:border-dark-200 resize-none text-center"/>
							</div>
							
							<div className="w-full flex justify-center p-1 pt-4">
								<input placeholder={t("Username")}
								       id="username"
								       onChange={formik.handleChange}
								       value={formik.values.username}
								       className="w-[60%] h-13 py-2 px-3 border border-2 border-gray-200 bg-gray-50 dark:bg-dark-800 dark:border-dark-400
		          rounded-md shadow-sm focus:outline-none focus:ring-transparent focus:border-gray-300 dark:focus:border-dark-200 resize-none text-center"/>
							</div>
							
							<div className="w-full flex justify-center p-1 pt-4">
								<input placeholder={t("Password")}
								       id="password"
								       type="password"
								       onChange={formik.handleChange}
								       value={formik.values.password}
								       className="w-[60%] h-13 py-2 px-3 border border-2 border-gray-200 bg-gray-50 dark:bg-dark-800 dark:border-dark-400
		          rounded-md shadow-sm focus:outline-none focus:ring-transparent focus:border-gray-300 dark:focus:border-dark-200 resize-none text-center"/>
							</div>
							
							<div className="w-full flex justify-center pt-4">
								<button className="w-40 h-10 py-1 px-3 mx-3 bg-gray-200 dark:bg-dark-400 opacity-95
		          rounded-md shadow-sm focus:outline-none active:bg-gray-100 dark:active:bg-dark-600" type="submit">
									{t("Sign Up")}
								</button>
							</div>
						</form>
						
						<div className="place-self-center pt-1 text-gray-400">
							{t("Already got a user?")}
							<Link className="text-blue-500 cursor-pointer active:text-blue-400" to="/login"> {t('Login!')}</Link>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}
