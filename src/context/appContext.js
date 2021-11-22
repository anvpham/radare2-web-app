import React from 'react';

const initialContext = {
    functionAssemblyCode: '',
    functionPseudoCode: '',
    functionNames: [],
    strings: [],
    binaryInfo: []
}

const appContext = React.createContext();

export { appContext, initialContext }