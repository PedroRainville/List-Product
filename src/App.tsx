import  React, { useEffect } from 'react';
import Home from './pages/Home'
import { getToken } from './services/api';

function App() {
    useEffect(() => {
        async function tokenRoutine() {            
            let token = await localStorage.getItem('token');
            if (token){
              console.log(JSON.parse(token))
            }
            else{
                 let responseToken = await getToken();
                 if (responseToken) {
                  localStorage.setItem('token', JSON.stringify(responseToken));                  
                 }
            }
          } tokenRoutine()
      }, [])

  return (
    <Home/>
  )
}

export default App
