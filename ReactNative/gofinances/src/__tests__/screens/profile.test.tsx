import React from 'react';
import {render} from '@testing-library/react-native'

import {Profile} from '../../screens/Profile'

test('checks if show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile/>)
    const inputName = getByPlaceholderText('nome')
    
    
    expect(inputName).toBeTruthy()
})

test('checks if user data has benn loaded',()=>{
    const { getByTestId } = render(<Profile/>)
    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')

    expect(inputName.props.value).toEqual('Alex')
    expect(inputSurname.props.value).toEqual('Ferreira')
})

test('checks if title render correctly', () => {
    const { getByTestId } = render(<Profile/>)
    const textTitle = getByTestId('text-title')

    expect(textTitle.props.children).toContain('Perfil')
})