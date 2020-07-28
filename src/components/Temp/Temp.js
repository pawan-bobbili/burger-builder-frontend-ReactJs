import React,{useEffect} from 'react';

function Temp(props) {
    useEffect(() => console.log('Temp m'),[]);
    return (
        <div style={{display:'none'}}></div>
    )
}

export default Temp;