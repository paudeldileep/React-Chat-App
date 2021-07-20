import React from 'react';

const SignInButton=({onClick=null,children=null})=> {
    return <button className="border border-blue-700 p-1" onClick={onClick}>{children}</button>
}

export default SignInButton;