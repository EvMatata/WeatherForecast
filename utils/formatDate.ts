export const formatDate = (timestamp: number, locale = "en-US") => {
	const date = new Date(timestamp * 1000);
	return date.toLocaleDateString(locale, {
		weekday: "long",
		day: "2-digit",
		month: "short",
	});
};
