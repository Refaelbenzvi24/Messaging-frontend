import clsx from "clsx";
import {ReactElementProps} from "../../../types";


export default (props: ReactElementProps) => {
	const {className, ...allProps} = props;
	
	return (
		<div {...allProps} className={`flex-row border-t border-gray-300 dark:border-dark-50 ${clsx(className)}`}/>
	)
}
