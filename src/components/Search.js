import React from 'react'
import Person from './Person';

const Search = ({ searchForPerson, searchValue, handleSearchChange, results }) => (
    <div>
        <h4>Search for a Contact</h4>
        <form onSubmit={searchForPerson}>
            <input
                value={searchValue}
                type="text"
                onChange={handleSearchChange}
            />
            <button type='submit'>Search</button>
        </form>

        <div>
            {results.map(result => {
                return <Person key={result.id} name={result.name} number={result.number} />
            })}
        </div>
    </div>
);

export default Search;