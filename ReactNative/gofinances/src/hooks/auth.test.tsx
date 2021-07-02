import { renderHook, act} from '@testing-library/react-hooks'
import {AuthProvider,useAuth} from './auth'

jest.mock('expo-google-app-auth', ()=>{
    return {
        logInAsync: () => {
            return{
                type: 'success',
                user: {
                    id: 'any_id',
                    email: 'alexfstos@gmail.com',
                    name: 'Alex',
                    photo: 'any_photo.png'
                }
            }
            
        }
    }
})

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing',async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        })

        await act( () => result.current.signInWithGoogle())
        
        expect(result.current.user.email)
        .toBe('alexfstos@gmail.com')
    })
})