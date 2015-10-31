import { flow } from '/usr/local/lib/node_modules/lodash'
import fs from 'fs'
// parseContacts: file contents -> [[name, date]]
// filterToBirthdaysInNext30Days: [[name, date]] ->  [[name, date]]
// calculateDaysAwayFromToday: [[name, date]] -> [[name, date, daysAway]]
// sortDatesChronologically: [[name, date, daysAway]] -> [[name, date, daysAway]]
// generateReport: [[name, date, daysAway]] -> "date: name daysAway \n"

// alex cusack 07/05\n myle byrne 07/05 -> [(alex cusack 07/05), (myle byrne 07/05)]
//
const parseContacts = (stringFromFile) => {
  return stringFromFile.trim().split('\n').map(parseContactLine)
}

// alex cusack 07/05 -> (Alex Cusack, 07/05)
const parseContactLine = (contactLine) => {
  const match = contactLine.trim().match(/(.*)(\d\d\/\d\d)$/)
  if (!match) { throw new Error(contactLine + ' did not match regex') }
  return {name: match[1].trim(), birthday: match[2].trim()}
}

//
const parseBirthdays = (listOfNameBirthdays) => {
  return listOfNameBirthdays.map(parseBirthday)
}

// [(alex cusack 07/05), (myle byrne 07/05)] -> [(alex cusack 07/05), (myle byrne 07/05)]
const parseBirthday = ({name, birthday}) => {
  let year = new Date()
  year = year.getFullYear()
  const [month, day] = birthday.split('/')
  return {name, birthday: new Date(year, month - 1, day)}
}

//
const sortBirthdays = (listOfNameBirthdays) => {
  return listOfNameBirthdays.sort(compareTwobirthdays)
}

const compareTwobirthdays = ({birthday: birthdayA}, {birthday: birthdayB}) => {
  return birthdayA.valueOf() - birthdayB.valueOf()
}

//
const filterToNext30Days = (listOfNameBirthdays) => {
  return listOfNameBirthdays.filter(birthdayWithin30days)
}

const birthdayWithin30days = ({birthday}) => {
  return birthdayWithinNdaysOf(new Date(), birthday, 30)
}

//
const calculateDaysAway = (namesAndBirthdays) => {
  return namesAndBirthdays.map(addDayDifference)
}

const addDayDifference = (nameAndBirthday) => {
  return Object.assign({}, nameAndBirthday, {daysAway: calculateDaysBetween(new Date(), nameAndBirthday.birthday)})
}

const calculateDaysBetween = (a, b) => {
  return Math.abs(millisecondsToDays(a) - millisecondsToDays(b))
}

const millisecondsToDays = (milliseconds) => {
  return Math.floor(milliseconds / 1000 / 60 / 60 / 24)
}

const birthdayWithinNdaysOf = (startDate, birthday, daysAway) => {
  const maxDateAway = (startDate.valueOf() + daysAway * 24 * 60 * 60 * 1000)
  return birthday.valueOf() <= maxDateAway && birthday.valueOf() >= startDate.valueOf()
}

//
const generateReport = (listOfNameBirthdaysAndDays) => {
  return listOfNameBirthdaysAndDays.map(generateReportLine).join('\n')
}

const generateReportLine = ({name, birthday, daysAway}) => {
  return `${name} : ${birthday}, ${daysAway} days from today`
}

const getReport = flow(
  parseContacts,
  parseBirthdays,
  filterToNext30Days,
  sortBirthdays,
  calculateDaysAway,
  generateReport
)

const getReport = (string) => {
  generateReport(parseContacts(string).reduce((namesAndBirthdays, nameAndBirthday) => {
      nameAndBirthday = parseBirthday(nameAndBirthday)
      return namesAndBirthdays.concat(birthdayWithin30days(namesAndBirthdays.birthday) ? nameAndBirthday : [])
   ,[]}.sort(compareTwobirthdays).map(calculateDaysAway))
}

fs.readFile('./namesAndBirthdays.txt', 'utf8', (err, data) => console.log(getReport(data.trim())))
