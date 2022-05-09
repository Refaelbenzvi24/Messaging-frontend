/**
 * convert a string to html element id.
 * Example: "hello world" => "hello-world"
 * @param id
 */
export const convertToElId = (id: string): string => id.replace(/[^\dA-Za-z]/g, '-')
	.toLowerCase()

export const debounce = (cb: (...args: any[]) => void, delay = 1000) => {
	let timeout: NodeJS.Timeout
	
	return (...args: [args: any]) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			cb(...args)
		}, delay)
	}
}


export const throttle = (cb: (...args: any[]) => void , delay = 1000) => {
	let shouldWait = false
	let waitingArgs: any[] | null
	const timeoutFunc = () => {
		if (waitingArgs == null) {
			shouldWait = false
		} else {
			cb(...waitingArgs)
			waitingArgs = null
			setTimeout(timeoutFunc, delay)
		}
	}
	
	return (...args: any[]) => {
		if (shouldWait) {
			waitingArgs = args
			return
		}
		
		cb(...args)
		shouldWait = true
		
		setTimeout(timeoutFunc, delay)
	}
}

export default {}
