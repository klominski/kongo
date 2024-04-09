import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './personservices';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Sebastian', number: '123-456-789', id: 1},
    {name: 'Random', number: '789-654-321', id: 2},
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
  
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      const numericId = Number(id);
      axios.delete(`http://localhost:3001/persons/${numericId}`)
        .then(response => {
          console.log('Delete successful:', response.data);
          setPersons(prevPersons => prevPersons.filter(person => person.id !== numericId));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  };  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;