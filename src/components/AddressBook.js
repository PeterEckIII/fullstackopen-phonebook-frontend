import React from 'react';
import Person from './Person';

const AddressBook = ({ persons, remove, update }) => (
    <div>
        <h2>Address Book</h2>
        <ul>
            {persons.map(person => {
                return (
                    <Person 
                        person={person}
                        key={person.id}
                        remove={remove}
                        update={update}
                    />
                )
            })}
        </ul>
    </div>
);

export default AddressBook;
