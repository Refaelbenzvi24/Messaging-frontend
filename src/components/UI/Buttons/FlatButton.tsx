import {ReactElementProps} from "../../../types";
import clsx from "clsx";

export default (props: ReactElementProps) => {
	return (
		<div className={`dark:text-white
										dark:hover:(bg-gray-100/[0.1])
										dark:focus:bg-gray-600
										dark:focus:text-gray-100
										dark:hover:text-gray-200
										hover:text-gray-500
										focus:text-gray-400
										hover:(bg-gray-100/[0.1])
										focus:bg-gray-200
										focus:outline-none
										focus:shadow-outline
										${clsx(props.className)}`}>
			{props.children}
		</div>
	)
}
