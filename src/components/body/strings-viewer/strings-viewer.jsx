import React from 'react';
import style from './style.module.css';

const StringsViewer = (props) => (
    <div className={`${style.stringsViewer} ${props.className}`}>
        <div className={style.title}>Strings</div> 
        {props.strings.map(string => (
            <div className={style.row} key={string.value}>
                <div className={style.referencedBy}>{`${string.fcn_name.length > 22 ? string.fcn_name.substring(0, 22) + '...' : string.fcn_name}`}</div>
                <div className={style.stringValue}>{string.value.length > 22 ? string.value.substring(0, 22) + '...' : string.value}</div>
            </div>
        ))}  
    </div>
)

export default StringsViewer
