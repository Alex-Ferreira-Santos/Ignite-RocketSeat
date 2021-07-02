import { renderHook, act} from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils'
import {AuthProvider,useAuth} from './auth'
import {logInAsync} from 'expo-google-app-auth'

jest.mock('expo-google-app-auth')

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing',async () => {

        const googleMocked = mocked(logInAsync as any)
        googleMocked.mockReturnValue({
            type: 'success',
            user: {
                id: 'any_id',
                email: 'alexfstos@gmail.com',
                name: 'Alex',
                photo: 'any_photo.png'
            }
        })

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        await act( () => result.current.signInWithGoogle())
        
        expect(result.current.user.email)
        .toBe('alexfstos@gmail.com')
    })

    it('should not connect if user cancel authentication with Google',async () => {

        const googleMocked = mocked(logInAsync as any)
        googleMocked.mockReturnValue({
            type: 'cancel',
        })

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        await act( () => result.current.signInWithGoogle())
        
        expect(result.current.user).not.toHaveProperty('id')
    })
})