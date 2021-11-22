import React, { useState, useContext } from 'react';
import style from './style.module.css';
import CodeViewer from './code-viewer/code-viewer';
import BinaryInfoViewer from './binary-info-viewer/binary-info-viewer';
import FunctionsViewer from './functions-viewer/functions-viewer';
import StringsViewer from './strings-viewer/strings-viewer';
import { appContext } from '../../context';
import axios from 'axios';

const Body = (props) => {

    const [assemblyCode, setAssemblyCode] = useState("");
    const context = useContext(appContext);

    axios.get('http://192.168.1.90:5000/getassemblycode?file_name=megabeets_0x1&function_name=main').then(
        res => {
            setAssemblyCode(res.data)
        }
    )

    return (
        <div className={style.body}>
            <div className={style.codeViewer}>
                <CodeViewer className={style.assemblyCode} text={assemblyCode} />
            </div>
            <div className={style.infoViewer}>
                <BinaryInfoViewer className={style.viewer} infoArray={context.appState.binaryInfo} />
                <StringsViewer className={style.viewer} strings={context.appState.strings} />
                <FunctionsViewer className={style.viewer} functionNames={context.appState.functionNames} />
            </div>
        </div>
    )
}

export default Body
