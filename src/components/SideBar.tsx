import {Link, useNavigate} from 'react-router-dom'

import SideBar from './UI/SideBar/SideBar'
import LinkButton from './UI/Buttons/LinkButton'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from './UI/Theme/ThemeToggle'
import LongDivider from './UI/Dividers/LongDivider'
import IconButton from './UI/Buttons/IconButton'
import Tooltip from './UI/Tooltip/Tooltip'
import Row from './UI/Grid/Row'
import Col from './UI/Grid/Col'
import SideBarLink from './UI/SideBar/SideBarLink'
import MessagesHistory from "./SideBar/MessagesHistory"
import Title from "./UI/Typograpy/Title";
import useAuth from "../hooks/useAuth"


export default () => {
	const {t} = useTranslation()
	const {logout} = useAuth()

	return (
		<div>
			<SideBar>
				<div className="flex h-full flex-col justify-between">
					<div className="flex-col">
						<Row>
							<Col>
								<Link to="/" className="py-4 px-4 flex flex-row items-center">
									<p className="px-3 text-2xl font-semibold tracking-widest text-gray-900 dark:text-white
													uppercase rounded-lg focus:outline-none focus:shadow-outline">
										{t('App Name')}
									</p>
								</Link>
							</Col>
						</Row>

						<SideBarLink id="home-button">
							<LinkButton to="/">{t('Home')}</LinkButton>
						</SideBarLink>

						<Row className="w-full pt-2">
							<Col className="w-full">
								<LongDivider/>
							</Col>
						</Row>

						<Row className="w-full mt-5 bg-gray-50 dark:bg-dark-400">
							<Col className="w-full">
								<Title className="px-2 py-1 text-xl text-gray-600 dark:text-gray-200">
									{t('Active Users')}
								</Title>
								<MessagesHistory/>
							</Col>
						</Row>
					</div>

					<div>
						<LongDivider/>
						<div className="flex flex-row py-3 px-3 justify-around">

							<Tooltip className="bottom-[40px] left-[-20%]" tooltip={t('Settings')}>
								<IconButton>
									<IconMdiSettings/>
								</IconButton>
							</Tooltip>

							<Tooltip className="bottom-[40px] left-[-80%]" tooltip={t('Notifications')}>
								<IconButton>
									<IconMdiBellOutline/>
								</IconButton>
							</Tooltip>

							<ThemeToggle/>

							<LanguageSelector/>

							<Tooltip className="bottom-[40px] right-[-60%]" tooltip={t('Logout')}>
								<IconButton onClick={logout}>
									<IconMdiLogout/>
								</IconButton>
							</Tooltip>

						</div>
					</div>
				</div>
			</SideBar>
		</div>
	)
}
