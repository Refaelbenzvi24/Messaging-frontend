import Error404 from '../components/UI/ErrorPages/404'
import Subtitle from '../components/UI/Typograpy/Subtitle'


const credit = {
	creditName: 'helloChad',
	creditLink: 'https://codepen.io/hellochad',
}

export default () => {
	return (
		<div dir="ltr">
			
			<div className="absolute flex w-full h-full bottom-0 justify-center items-end">
				<Subtitle className="justify-self-center z-3 mb-5">
					Credit to
					{' '}
					<a className="font-bold" href={credit['creditLink']}>
						@
						{credit['creditName']}
					</a>
				</Subtitle>
			</div>
			
			<div className="absolute w-full h-full top-0">
				<Error404/>
			</div>
		
		</div>
	)
}
