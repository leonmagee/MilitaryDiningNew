export function removeQuotes(name) {
  return name
  .replace('&#8220;', '"')
  .replace('&#8221;', '"')
  .replace('&#8243;', '"')
  .replace('&#8217;', "'")
}

export function dateString() {

    const currentDate = new Date()

    const currentDay = currentDate.getDate()
    
    const currentMonth = currentDate.getMonth()

    const currentYear = currentDate.getFullYear()

    return currentMonth + '_' + currentDay + '_' + currentYear;
}

export function dateStringName() {
	    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ]

    const currentDate = new Date()

    const currentDay = currentDate.getDate()
    
    const currentMonth = currentDate.getMonth()

    const currentMonthName = monthNames[currentMonth]

    const currentYear = currentDate.getFullYear()

    return currentMonthName + ' ' + currentDay + ' - ' + currentYear;
}