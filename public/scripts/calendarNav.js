/**
 * Get the new calendar content for the specified year and month, adjusting for overflow / underflow on the month
 */
function navigateToMonth(year, month) {
	console.log('Bang!')
	// Adjust year/month if month goes out of bounds
	if (month < 1) {
		month = 12
		year--
	} else if (month > 12) {
		month = 1
		year++
	}

	const url = `/events/calendar?year=${year}&month=${month}&partial=true`

	fetch(url)
		.then((res) => res.text())
		.then((html) => {
			const parser = new DOMParser()
			const doc = parser.parseFromString(html, 'text/html')
			const newContent = doc.querySelector('#calendar-content')
			const oldContent = document.querySelector('#calendar-content')
			if (newContent && oldContent) {
				oldContent.replaceWith(newContent)
				history.pushState(
					{},
					'',
					`/events/calendar?year=${year}&month=${month}`
				)
			}
		})
		.catch((err) => console.error('Calendar update failed:', err))
}

window.navigateToMonth = navigateToMonth
console.log('Calendar navigation script loaded successfully')
