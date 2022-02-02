import React from 'react';
import './App.css';
import {useAuth} from "context/auth-context"
import {UnauthenticatedApp} from "./unauthenticated-app"
import {AuthenticatedApp} from './authenticater-app'
function App() {
    const {user} = useAuth()
    console.log('打印',user)
    return (
    <div className="App">
        {user? <AuthenticatedApp/>:<UnauthenticatedApp/>}
    </div>
  );
}



export default App;
