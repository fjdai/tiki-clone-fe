import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { persistor, store } from "./redux/store.jsx"
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/lib/integration/react';
import "./styles/main.scss"
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from 'react-toastify';

const mode = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: '#36261a'
        },
        secondary: {
          main: '#57121e'
        },
        text: {
          primary: '#36261a',
          secondary: '#57121e',
        },
        background: {
          default: '#fff',
          paper: "#f8f8f8"
        },
      }
      :
      {
        common: {
          black: "#2C3639",
          white: "#DCD7C9"
        },
        primary: {
          main: '#A27B5C',
          light: '#fff',
          dark: '#DCD7C9',
          contrastText: '#2C3639'
        },
        secondary: {
          main: '#DCD7C9',
          light: '#fff',
          dark: '#fff',
          contrastText: '#fff'
        },
        text: {
          primary: '#DCD7C9',
          secondary: '#DCD7C9',
          disable: '#fff',
          icon: '#DCD7C9'
        },
        divider: '#A27B5C',
        background: {
          default: '#3F4E4F',
          paper: "#2C3639"
        },
        action: {
          active: '#fff',
          hover: 'rgb(220,215,201,0.5)',
          hoverOpacity: 0.04,
          selected: 'rgba(0, 0, 0, 0.5)',
          selectedOpacity: 0.5,
          disable: '#fff',
          disableOpacity: 0.5,
          focus: 'rgba(0, 0, 0, 0.5)',
          focusOpacity: 0.5,
          activatedOpacity: 0.5
        },
      }),
  },
});



const theme = createTheme(mode('light'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer autoClose={2500} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
