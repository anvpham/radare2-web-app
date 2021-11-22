import React from 'react';
import style from './style.module.css';

const BinaryInfoViewer = (props) => {
    return (
        <div className={`${style.binaryInfoViewer} ${props.className}`}>
            <div className={style.title}>Binary Info</div>
            {props.infoArray.map(entry => {
                if(typeof entry[1] !== 'object') {
                    return (
                        <div className={style.row}>
                            <div className={style.key}>{entry[0]}</div>
                            <div className={style.value}>{entry[1]}</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default BinaryInfoViewer
