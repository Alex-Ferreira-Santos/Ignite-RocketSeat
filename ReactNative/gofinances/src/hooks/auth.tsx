import React,{createContext, ReactNode, useContext, useState} from 'react';

import * as Google from 'expo-google-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface AuthProviderProps{
    children: ReactNode;
}

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{
    user: User
    signInWithGoogle(): Promise<void>
}
const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<User>()

    async function signInWithGoogle(){
        try{
            const result = await Google.logInAsync({
                iosClientId: '628244853630-90b8826i7vk6el2de823qdik3doehjf6.apps.googleusercontent.com',
                androidClientId: '628244853630-md3i9sfn0j1cmmog7ljj9bobptb756oo.apps.googleusercontent.com',
                scopes: ['profile','email']
            })

            if(result.type === 'success'){
                const userLogged = {
                    id: String( result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                }
                setUser(userLogged);
                await AsyncStorage.setItem('@gofinance:user',JSON.stringify(userLogged))
                
            }

            
        }catch(err){
            throw new Error(err)
        }
    }

    return(
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>  
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context
}

export {AuthProvider,useAuth}