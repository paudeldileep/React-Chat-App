import React from 'react';

const SignOutButton=({onClick=null,children=null})=> {
    return <button className="border border-red-300 text-red-600 px-2 font-mono rounded-sm" onClick={onClick}>{children}</button>
}

export default SignOutButton;