import React from 'react';
import {Header} from "semantic-ui-react";
import firebase from "../firebase";

function UserPanel() {
    return (
        <div>
            <Header>dane z firebase dla usera {firebase.auth().currentUser.uid} </Header>
        </div>
    )
};

export default UserPanel;

// import React, {useState} from 'react'
// import { Field, Input, Label, Control, Notification, Delete } from 'bloomer'
// import { Button } from 'bloomer/lib/elements/Button'
// import { login } from "../services/AuthService"

// const loginFormContainer = {
//   maxWidth: '790px',
//   margin: '0 auto',
//   height: '100vh', 
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// }

// const Login = props => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [hasSomeError, setHasSomeError] = useState(false)
//   // 1. Create login form that has two fields
//   // - email
//   // - password
//   // 2. form should be v- and h- centered
//   // 3. there should be a button "login"
//   // 4. if we press login, then we should fire
//   // - login function from AuthService

//   // DO NOT USE FORMIK HERE!
//   const handleEmail = event => setEmail(event.target.value)
//   const handlePassword = event => setPassword(event.target.value)

//   return <div style={loginFormContainer}>
//     <form style={{ width: '100%' }}>
//       <Field>
//         <Label>E-mail</Label>
//         <Control>
//             <Input value={email} type="email" placeholder='Email' onChange={handleEmail}/>
//         </Control>
//       </Field>
//       <Field>
//         <Label>Password</Label>
//         <Control>
//             <Input value={password} type="password" placeholder='Password' onChange={handlePassword}/>
//         </Control>
//       </Field>
//       <Button onClick={async () => {
//         try {
//           await login(email, password)
//         } catch {
//           setHasSomeError(true)
//         }
//       }}>Login</Button>
//       {hasSomeError && <Notification isColor='danger'>
//         <Delete />
//         Couldn't login
//       </Notification>}
//     </form>
//   </div>
// }

// export default Login