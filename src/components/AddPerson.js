import React from 'react'

const AddPerson = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => (
    <div>
        <form onSubmit={addPerson}>
            <div>
                Name: <span> </span>
                <input
                    value={newName}
                    type='text'
                    onChange={handlePersonChange}
                />
            </div>
            <div>
                Number: <span> </span>
                <input
                    type="text"
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    </div>
);


export default AddPerson;