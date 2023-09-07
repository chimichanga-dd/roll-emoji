import React, { Suspense } from "react";
import "./App.css";

import { useAuthState, AuthProvider } from "./components/auth/authContext";

// const AuthenticatedApp = React.lazy(() => import('./components/auth/authenticatedApp'))
// const UnauthenticatedApp = React.lazy(() => import('./components/auth/unauthenticatedApp'))

// const Main = () => {
//   const {state: {user}} = useAuthState()
//   return (
//     <Suspense fallback={<div></div>}>
//       <div className={`App main-body-${user ? "auth" : "unauth"}`}>
//         {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
//       </div>
//     </Suspense>
//   )
// }

import AuthenticatedApp from "./components/auth/authenticatedApp";
import UnauthenticatedApp from "./components/auth/unauthenticatedApp";
const Main = () => {
  const {
    state: { user }
  } = useAuthState();
  return (
    <Suspense fallback={<div></div>}>
      <div className={`App main-body-${user ? "auth" : "unauth"}`}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </Suspense>
  );
};

function App() {
  console.log("using dev");
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
