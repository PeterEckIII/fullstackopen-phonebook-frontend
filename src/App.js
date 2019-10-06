import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import AddPerson from './components/AddPerson';
import AddressBook from './components/AddressBook';
import api from './services/api';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    api
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
      .catch(e => `Error: ${e}`);
  }, [])

  const addPerson = e => {
    e.preventDefault();
    let newPerson = { name: e.target[0].value, number: e.target[1].value };
    if (persons.map(person => person.name).includes(newPerson.name)) {
      const record = persons.map(person => person).find(person => person.name === newPerson.name);
      console.log(newPerson);
      let res = window.confirm(`${newPerson.name} is already in the Phone Book. Would you like to update their number to the one provided?`)
      res
        ? updateNumber(record.id, newPerson)
        : setPersons(persons); setNewName(''); setNewNumber('');
    } else {
      newPerson.id = Math.random()
      api
        .create(newPerson)
        .then(newPerson => {
          setPersons([...persons, newPerson])
          setNewName('')
          setNewNumber('')
        })
        .catch(e => `Error ${e}`)
    }
  };

  const updateNumber = (id, newObject) => {
    api
      .update(id, newObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id ? person : updatedPerson))
      })
  }

  const removePerson = id => {
    const personToRemove = persons.filter(person => person.id !== id)
    console.log(personToRemove);
    api
      .remove(id)
      .then(removedPerson => {
        setPersons(persons);
      })
  }

  const searchForPerson = e => {
    e.preventDefault();
    const searchValue = e.target[0].value;
    if (searchValue === '' || searchValue === ' ') {
      return (
        <div style={{ backgroundColor: 'salmon', color: 'maroon' }}>
          You must enter a search term!
        </div>
      )
    } else {
      const filteredResult = persons.filter(person => person.name.includes(searchValue))
      setResults(filteredResult);
    }
  }

  const handlePersonChange = e => {
    setNewName(e.target.value);
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  }

  const handleSearchChange = e => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <h1>Phone Book</h1>
      <Search 
        searchForPerson={searchForPerson} 
        searchValue={searchValue} 
        handleSearchChange={handleSearchChange}
        results={results}
      />

      <AddPerson 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />

      <AddressBook 
        persons={persons}
        remove={removePerson}
        update={updateNumber}
      />
    </div>
  );
}

export default App;
