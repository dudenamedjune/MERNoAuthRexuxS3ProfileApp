import React from 'react';

const Name = ({ name, url }) => {
  return(
    <div>
      <h1>Hello, {name}</h1>
      <img style={{borderRadius: "50%", maxHeight: "500px"}} src={ url } />
    </div>

  );
}

export default Name;
