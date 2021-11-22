import React from 'react';
import style from './style.module.css';
import Button from 'react-bootstrap/Button';

const FunctionsViewer = (props) => (
    <div className={`${style.functionsViewer} ${props.className}`}>
        <div className={style.title}>Functions</div> 
        {props.functionNames.map(name => (
            <div className={style.row} key={name}>
                <div className={style.functionName}>{name.length > 30 ? name.substring(0, 30) + '...' : name}</div>
                <Button className={style.disassembleButton} variant="outline-dark" >Disassemble</Button>
            </div>
        ))}  
    </div>
)

export default FunctionsViewer
