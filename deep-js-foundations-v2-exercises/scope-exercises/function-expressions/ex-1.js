function printRecords(recordIds) {
  // TODO
  studentRecords
    .sort(function sortByName(record1, record2) {
      if (record1.name < record2.name) return -1
      else if (record1.name > record2.name) return 1
      return 0
    })
    .forEach(function findThenPrintRecord({ id, name, paid }) {
      if (recordIds.includes(id)) {
        console.log(`${name} (${id}): ${paid ? 'Paid' : 'Not Paid'}`)
      }
    })
}

function paidStudentsToEnroll() {
  // TODO
  var result = []
  studentRecords.forEach(function findPaidStudent(record) {
    if (record.paid || currentEnrollment.includes(record.id)) {
      result.push(record.id)
    }
  })

  return result
}

function remindUnpaid(recordIds) {
  // TODO
  var result = []
  studentRecords.forEach(function isRemindUnpaid({ id, paid }) {
    if (recordIds.includes(id) && !paid) {
      result.push(id)
    }
  })

  printRecords(result)
}

// ********************************

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

printRecords(currentEnrollment)
console.log('----')
currentEnrollment = paidStudentsToEnroll()
printRecords(currentEnrollment)
console.log('----')
remindUnpaid(currentEnrollment)

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
