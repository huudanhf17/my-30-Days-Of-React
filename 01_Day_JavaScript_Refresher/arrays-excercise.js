// *****Exercise: Level 1****** //

// Level 1-1
const e11 = []

// Level 1-2
const e12 = ['undefined', 'null', 'Boolean', 'Number', 'BigInt', 'String', 'Symbol']

// Level 1-3
const e13 = e12.length

// Level 1-4
const e14a = e12[0]
const e14b = e12[Math.floor(e13 / 2)]
const e14c = e12[e12.length - 1]
//console.log(e14c)

// Level 1-5
const mixedDataTypes = ['string', 5, 8, 9, true, function () { }, null]
const mixedDataTypesLength = mixedDataTypes.length

// Level 1-6
const itCompanies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']

// Level 1-7
//console.log(itCompanies)

// Level 1-8
//console.log(itCompanies.length)

// Level 1-9
const firstItCompanies = itCompanies[0]
const middleItCompanies = itCompanies[Math.floor(e13 / 2)]
const lastItCompanies = itCompanies[itCompanies.length - 1]
//console.log(`${firstItCompanies} ${middleItCompanies} ${lastItCompanies}`)

// Level 1-10
for (const ele of itCompanies) {
    //console.log(ele)
}

// Level 1-11
for (const ele of itCompanies) {
    //console.log(ele.toUpperCase())
}

// Level 1-12
const e112a = itCompanies.join(', ')
const e112b = ' are big IT companies.'
//console.log(e112a + e112b)

// Level 1-13
