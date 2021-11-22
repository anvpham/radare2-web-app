import React from 'react';
import style from './style.module.css';

const CodeViewer = (props) => (
    <div className={`${style.codeViewer} ${props.className}`}>
        <pre>{props.text}</pre>
    </div>
)

export default CodeViewer
