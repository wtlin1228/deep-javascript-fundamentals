var currentEnrollment = [410, 105, 664, 375]

var studentRecords = [
  { id: 313, name: 'Frank', paid: true },
  { id: 410, name: 'Suzy', paid: true },
  { id: 709, name: 'Brian', paid: false },
  { id: 105, name: 'Henry', paid: false },
  { id: 502, name: 'Mary', paid: true },
  { id: 664, name: 'Bob', paid: false },
  { id: 250, name: 'Peter', paid: true },
  { id: 375, name: 'Sarah', paid: true },
  { id: 867, name: 'Greg', paid: false }
]

var workshop = defineWorkshop()
studentRecords.forEach(function addStudent(record) {
  workshop.addStudent(record.id, record.name, record.paid)
})
currentEnrollment.forEach(function enrollStudent(id) {
  workshop.enrollStudent(id)
})
workshop.printCurrentEnrollment()

console.log('----')

workshop.enrollPaidStudents()
workshop.printCurrentEnrollment()

console.log('----')

workshop.remindUnpaidStudents()

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

// ********************************

function defineWorkshop() {
  var studentRecords = []
  var currentEnrollment = []

  var publicAPI = {
    addStudent,
    enrollStudent,
    printCurrentEnrollment,
    enrollPaidStudents,
    remindUnpaidStudents
  }

  return publicAPI

  /********** public functions **********/

  function addStudent(id, name, paid) {
    studentRecords.push({ id, name, paid })
  }

  function enrollStudent(id) {
    if (!currentEnrollment.includes(id)) {
      currentEnrollment.push(id)
    }
  }

  function printCurrentEnrollment() {
    var records = currentEnrollment.map(getStudentFromId)

    printRecords(records)
  }

  function enrollPaidStudents() {
    var ids = paidStudentsToEnroll()

    ids.forEach(enrollStudent)
  }

  function remindUnpaidStudents() {
    var records = currentEnrollment.filter(notYetPaid).map(getStudentFromId)

    printRecords(records)
  }

  /********** private functions **********/

  function getStudentFromId(studentId) {
    return studentRecords.find(matchId)

    function matchId(record) {
      return record.id == studentId
    }
  }

  function sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1
    else if (record1.name > record2.name) return 1
    else return 0
  }

  function printRecords(records) {
    records.sort(sortByNameAsc)
    records.forEach(printRecord)
  }

  function printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? 'Paid' : 'Not Paid'}`
    )
  }

  function paidStudentsToEnroll() {
    var recordsToEnroll = studentRecords.filter(needToEnroll)

    var idsToEnroll = recordsToEnroll.map(getStudentId)

    return [...currentEnrollment, ...idsToEnroll]
  }

  function needToEnroll(record) {
    return record.paid && !currentEnrollment.includes(record.id)
  }

  function notYetPaid(studentId) {
    var record = getStudentFromId(studentId)
    return !record.paid
  }

  function getStudentId(record) {
    return record.id
  }
}
