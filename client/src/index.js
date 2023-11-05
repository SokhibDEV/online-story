import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import userStore from './store/userStore';
import DeviceStore from './store/deviceStore';


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<Context.Provider value={{
			user : new userStore(),
			device: new DeviceStore(),
		}}> <App />
		</Context.Provider>
		
	</Router>,
);
