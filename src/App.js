import { useEffect, useState } from "react";
import "./App.css";
import SignInButton from "./components/SignInButton";
import { auth, db } from "./config/firebase";
import firebase from "firebase";
import MessageBox from "./components/MessageBox";
import SignOutButton from "./components/SignOutButton";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
       // console.log(authUser);
        setUser(authUser);
      } else {
        //user logged out
        setUser(null);
      }
    });
    //clean up call
    return unsubscribe;
  });

  //google sign in
  const signIn = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    auth.useDeviceLanguage();
    // Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  //sign out 
  const signOut=async ()=>{
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  }

  const content = user ? (
    <MessageBox user={user} />
  ) : (
    <SignInButton className="my-2" onClick={signIn}>
      Sign in with Google
    </SignInButton>
  );

  return (
    <div className="App flex flex-col items-center justify-between min-h-screen bg-gray-400 pb-2">
      <div className="header sticky top-0 w-full h-12 px-2 flex justify-between items-center bg-blue-300">
        <h2 className="font-bold text-lg font-mono">React-Chat</h2>
        {user && <SignOutButton onClick={signOut}>Sign Out</SignOutButton>}
      </div>
      <div className="w-5/6 h-[80vh] md:w-1/2 text-center">{content}</div>
    </div>
  );
}

export default App;
