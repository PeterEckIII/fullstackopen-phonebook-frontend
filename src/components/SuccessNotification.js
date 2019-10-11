import React from 'react'
import styled from 'styled-components';

const SuccessMessage = styled.div`
    font-weight: 600;
    color: white;
    background-color: #37CC57;
    border-radius: 3px;
    padding: 8px;
    margin: 20px;
    border: 1px solid green;
    display: inline-block;
`;

const SuccessNotification = ({ message }) => {
    return message === null || message === undefined || message === ''
        ? null
        : <SuccessMessage>{message}</SuccessMessage>
}

export default SuccessNotification;
