import React from 'react'
import Remove from './Remove';

const Person = ({ person, remove, update }) => {
    return (
            <div key={person.id} style={{ margin: '10px', padding: '5px' }}>
                <span>{person.name}</span>:<span>  -  </span>
                <span>{person.number}</span>
                <Remove
                    person={person}
                    remove={remove}
                    update={update}
                    id={person.id}
                />
            </div>
    )
};

export default Person;
