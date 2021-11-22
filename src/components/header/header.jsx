import React, { useContext, useState } from 'react';
import style from './style.module.css';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { appContext } from '../../context';
import axios from 'axios';

const Header = (props) => {

    const [state, setState] = useState({
        selectedFile: null,
        submitting: false,
        submitted: false,
    });

    const context = useContext(appContext);
    
    const fileSelectedHandler = event => {
        setState({
            selectedFile: event.target.files[0],
            submitting: false,
            submitted: false
        })
    }

    const submit = async () => {
        if(state.selectedFile == null) {
            alert('Please select a file to submit');
        } else {
            const formData = new FormData();
            formData.append('file', state.selectedFile, state.selectedFile.name);

            setState({
                ...state,
                submitting: true
            });

            const response = await axios.post('http://192.168.1.90:5000/uploadfile', formData);

            if(response.status !== 201) {
                alert(response.data);
            } else {
                const response = await axios.get(`http://192.168.1.90:5000/binaryinfo?file_name=${state.selectedFile.name}`)
                const binaryInfoArray = [];

                Object.entries(response.data.binaryInfo).forEach(entry => {
                    if(typeof entry[1] === 'object') {
                        Object.entries(entry[1]).forEach(data => {
                            binaryInfoArray.push([data[0], data[1]])
                        })
                    } else {
                        binaryInfoArray.push([entry[0], entry[1]])
                    }
                })
                
                setState({
                    ...state,
                    submitting: false,
                    submitted: true
                })

                console.log(binaryInfoArray);
                console.log(response.data.strings);
                console.log(response.data.functions);

                context.setAppState({
                    binaryInfo: binaryInfoArray,
                    functionNames: response.data.functions,
                    strings: response.data.strings,
                })
            }
        }
    }

    return (
        <div className={props.className}>
            <div className={style.title}>
            Binary Analysis With Radare2
            </div>
            <div className={style.fileInputContainer}>
                <input className={style.fileInput} type="file" onChange={fileSelectedHandler}/>
                <Button className={`${style.submitButton} ${state.selectedFile === null ? 'disabled' : 'active'}`} variant="outline-dark" onClick={state.submitted ? null : state.submitting ? null : submit}>
                 {state.submitted ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg> :
                    state.submitting ? 
                    <Spinner animation="border" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> : 'Submit'}
                </Button>
            </div>
        </div>
    )
}

export default Header
