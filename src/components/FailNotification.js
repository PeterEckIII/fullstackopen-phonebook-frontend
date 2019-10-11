import React from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.div`
    font-weight: 600;
    color: white;
    background-color: #FF7E73;
    border-radius: 3px;
    padding: 8px;
    margin: 20px;
    border: 1px solid red;
    display: inline-block;
`;

const FailNotification = ({ message }) => {
    return message === null || message === undefined || message === ''
        ? null
        : <ErrorMessage>{ message }</ErrorMessage>
}

export default FailNotification;
