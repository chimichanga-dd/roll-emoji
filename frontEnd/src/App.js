import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import {
  useAuthState,
  AuthProvider
} from "./components/auth/authContext"

const AuthenticatedApp = React.lazy(() => import('./components/auth/authenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('./components/auth/unauthenticatedApp'))

const Main = () => {
  const {state: {user}} = useAuthState()
  return (
    <Suspense fallback={<div></div>}>
      {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </Suspense>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="App main-body">
        <Main/>
      </div>
    </AuthProvider>
  );
}

export default App;