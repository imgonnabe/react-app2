import React, { createContext, useContext, useState } from 'react';

const LoginSetting = createContext()

export const AppProvider = ({data}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginId, setLoginId] = useState('');

    return(
        <LoginSetting.Provider value={{isLoggedIn, setIsLoggedIn, loginId, setLoginId}}>
            {data}
        </LoginSetting.Provider>
    )
}

export const useLoginSetting = () => {
    return useContext(LoginSetting)
}