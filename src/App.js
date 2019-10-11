import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import AddPerson from './components/AddPerson';
import AddressBook from './components/AddressBook';
import SuccessNotification from './components/SuccessNotification';
import FailNotification from './components/FailNotification';
import api from './services/api';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      if (res) {
        updateNumber(record.id, newPerson)
      } else {
        setPersons(persons);
        setNewName('');
        setNewNumber('');
      };
    } else {
      newPerson.id = Math.random()
      api
        .create(newPerson)
        .then(newPerson => {
          setPersons([...persons, newPerson])
          setNewName('')
          setNewNumber('')
          setSuccessMessage('Successfully added contact')
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000)
        })
        .catch(e => {
          setErrorMessage('Error adding contact')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  };

  const updateNumber = (id, newObject) => {
    api
      .update(id, newObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id ? person : updatedPerson))
        setNewNumber('')
        setNewName('');
        setSuccessMessage('Successfully updated number!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000)
      })
      .catch(e => {
        setSuccessMessage('');
        setErrorMessage('Error updating number. That contact was recently deleted');
      })
  }

  const removePerson = id => {
    api
      .remove(id)
      .then(removedPerson => {
        setPersons(persons);
        setErrorMessage('');
        setSuccessMessage('Successfully removed!');
      })
      .catch(e => {
        setSuccessMessage('');
        setErrorMessage('Could not remove contact');
      })
  }

  const searchForPerson = e => {
    e.preventDefault();
    const searchValue = e.target[0].value;
    if (searchValue === '' || searchValue === ' ') {
      return
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
      <SuccessNotification message={successMessage} />
      <FailNotification message={errorMessage} />

      <AddressBook 
        persons={persons}
        remove={removePerson}
        update={updateNumber}
      />
    </div>
  );
}

export default App;
