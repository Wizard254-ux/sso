function getCookie(cname) {
	console.log('Getting cookie for:', cname);
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	console.log('All cookies:', decodedCookie);
	let ca = decodedCookie.split(";");
	console.log('Number of cookies found:', ca.length);
	
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		console.log(`Checking cookie [${i}]:`, c.substring(0, Math.min(20, c.length)) + '...');
		if (c.indexOf(name) === 0) {
			const value = c.substring(name.length, c.length);
			console.log(`Found cookie ${cname}! Value length:`, value.length);
			return value;
		}
	}
	console.log(`Cookie ${cname} not found`);
	return "";
}

function setCookie(cname, cvalue, expires = 24 * 60 * 60, path = "/") {
	let cookie = `${cname}=${cvalue};`;
	if (expires) {
		const d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		cookie += `expires=${d.toUTCString()};`;
	}
	if (path) {
		cookie += `path=${path};`;
	}
	document.cookie = cookie;
}

function clearCookie(cname, path = "/") {
	let cookie = `${cname}=;`;
	const d = new Date();
	d.setTime(d.getTime() - 50 * 1000);
	cookie += `expires=${d.toUTCString()};`;
	cookie += `path=${path};`;
	document.cookie = cookie;
}

export { getCookie, setCookie, clearCookie };
