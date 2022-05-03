import type { ReactElementProps } from '../../../types'
import clsx from 'clsx'


export default (props: ReactElementProps) => {
	return (
		<span {...props} className={`text-gray-500 dark:text-gray-300 text-sm ${clsx(props.className)}`}>
			{props.children}
		</span>
	)
}
