import React from 'react'

const Remove = ({ person, remove }) => {
    return (
        <button onClick={() => {
            alert(`Removed ${person.name}`)
            remove(person.id)
        }}>
            remove
        </button>
    )
}

export default Remove;
