import {ReactElementProps} from "../../../types";

export default (props: ReactElementProps) => {
	return (
		<div className="avatar placeholder">
			<div className="inline-block h-10 w-10 rounded-full ring-2 bg-gray-200 dark:bg-dark-100 ring-transparent">
				<span className="text-1xl dark:text-light-100">
					{props.children}
				</span>
			</div>
		</div>
	)
}
