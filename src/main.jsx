import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from "./redux/store.jsx"
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./styles/main.scss"

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
        }
      }
      :
      {
        primary: {
          main: '#994141'
        },
        secondary: {
          main: '#dbcfc6'
        },
        text: {
          primary: '#994141',
          secondary: '#dbcfc6',
        },
        background: {
          default: '#474646',
          paper: "#171110"
        }
      }),
  },
});



const theme = createTheme(mode('light'));

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>,
)
