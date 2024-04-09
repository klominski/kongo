const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const url = "mongodb+srv://sebussobczynski:Dfc3x3iOa4FIkorc@phonebook.j508e9k.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook"

mongoose.set('strictQuery', false)
mongoose
  .connect(url, { dbName: 'phonebook' })
  .then(console.log('Connected to DB'))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`Added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}