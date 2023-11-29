import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=0085c850"; const _jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=0085c850"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=0085c850"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import App from "/src/App.jsx?t=1701238919251";
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=0085c850";
import { store } from "/src/redux/store.jsx?t=1701235740051";
import CssBaseline from "/node_modules/.vite/deps/@mui_material_CssBaseline.js?v=0085c850";
import { ThemeProvider, createTheme } from "/node_modules/.vite/deps/@mui_material_styles.js?v=0085c850";
const mode = (mode)=>({
        palette: {
            mode,
            ...mode === 'light' ? {
                primary: {
                    main: '#36261a'
                },
                secondary: {
                    main: '#57121e'
                },
                text: {
                    primary: '#36261a',
                    secondary: '#57121e'
                },
                background: {
                    default: '#fff',
                    paper: "#f8f8f8"
                }
            } : {
                primary: {
                    main: '#994141'
                },
                secondary: {
                    main: '#dbcfc6'
                },
                text: {
                    primary: '#994141',
                    secondary: '#dbcfc6'
                },
                background: {
                    default: '#474646',
                    paper: "#171110"
                }
            }
        }
    });
const theme = createTheme(mode('light'));
ReactDOM.createRoot(document.getElementById('root')).render(// <React.StrictMode>
/*#__PURE__*/ _jsxDEV(Provider, {
    store: store,
    children: /*#__PURE__*/ _jsxDEV(ThemeProvider, {
        theme: theme,
        children: [
            /*#__PURE__*/ _jsxDEV(CssBaseline, {}, void 0, false, {
                fileName: "D:/Code/Frontend/TestFresher/buybook/src/main.jsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV(App, {}, void 0, false, {
                fileName: "D:/Code/Frontend/TestFresher/buybook/src/main.jsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "D:/Code/Frontend/TestFresher/buybook/src/main.jsx",
        lineNumber: 56,
        columnNumber: 5
    }, this)
}, void 0, false, {
    fileName: "D:/Code/Frontend/TestFresher/buybook/src/main.jsx",
    lineNumber: 55,
    columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5qc3gnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSBcIi4vcmVkdXgvc3RvcmUuanN4XCJcbmltcG9ydCBDc3NCYXNlbGluZSBmcm9tICdAbXVpL21hdGVyaWFsL0Nzc0Jhc2VsaW5lJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIsIGNyZWF0ZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xuXG5jb25zdCBtb2RlID0gKG1vZGUpID0+ICh7XG4gIHBhbGV0dGU6IHtcbiAgICBtb2RlLFxuICAgIC4uLihtb2RlID09PSAnbGlnaHQnXG4gICAgICA/IHtcbiAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgIG1haW46ICcjMzYyNjFhJ1xuICAgICAgICB9LFxuICAgICAgICBzZWNvbmRhcnk6IHtcbiAgICAgICAgICBtYWluOiAnIzU3MTIxZSdcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHByaW1hcnk6ICcjMzYyNjFhJyxcbiAgICAgICAgICBzZWNvbmRhcnk6ICcjNTcxMjFlJyxcbiAgICAgICAgfSxcbiAgICAgICAgYmFja2dyb3VuZDoge1xuICAgICAgICAgIGRlZmF1bHQ6ICcjZmZmJyxcbiAgICAgICAgICBwYXBlcjogXCIjZjhmOGY4XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgOlxuICAgICAge1xuICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgbWFpbjogJyM5OTQxNDEnXG4gICAgICAgIH0sXG4gICAgICAgIHNlY29uZGFyeToge1xuICAgICAgICAgIG1haW46ICcjZGJjZmM2J1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgcHJpbWFyeTogJyM5OTQxNDEnLFxuICAgICAgICAgIHNlY29uZGFyeTogJyNkYmNmYzYnLFxuICAgICAgICB9LFxuICAgICAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICAgICAgZGVmYXVsdDogJyM0NzQ2NDYnLFxuICAgICAgICAgIHBhcGVyOiBcIiMxNzExMTBcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgfSxcbn0pO1xuXG5cblxuY29uc3QgdGhlbWUgPSBjcmVhdGVUaGVtZShtb2RlKCdsaWdodCcpKTtcblxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKS5yZW5kZXIoXG4gIC8vIDxSZWFjdC5TdHJpY3RNb2RlPlxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgPENzc0Jhc2VsaW5lIC8+XG4gICAgICA8QXBwIC8+XG4gICAgPC9UaGVtZVByb3ZpZGVyPlxuICA8L1Byb3ZpZGVyPlxuICAvLyA8L1JlYWN0LlN0cmljdE1vZGU+LFxuKVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJBcHAiLCJQcm92aWRlciIsInN0b3JlIiwiQ3NzQmFzZWxpbmUiLCJUaGVtZVByb3ZpZGVyIiwiY3JlYXRlVGhlbWUiLCJtb2RlIiwicGFsZXR0ZSIsInByaW1hcnkiLCJtYWluIiwic2Vjb25kYXJ5IiwidGV4dCIsImJhY2tncm91bmQiLCJkZWZhdWx0IiwicGFwZXIiLCJ0aGVtZSIsImNyZWF0ZVJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUEsT0FBT0EsV0FBVyxRQUFPO0FBQ3pCLE9BQU9DLGNBQWMsbUJBQWtCO0FBQ3ZDLE9BQU9DLFNBQVMsWUFBVztBQUMzQixTQUFTQyxRQUFRLFFBQVEsY0FBYztBQUN2QyxTQUFTQyxLQUFLLFFBQVEsb0JBQW1CO0FBQ3pDLE9BQU9DLGlCQUFpQiw0QkFBNEI7QUFDcEQsU0FBU0MsYUFBYSxFQUFFQyxXQUFXLFFBQVEsdUJBQXVCO0FBRWxFLE1BQU1DLE9BQU8sQ0FBQ0EsT0FBVSxDQUFBO1FBQ3RCQyxTQUFTO1lBQ1BEO1lBQ0EsR0FBSUEsU0FBUyxVQUNUO2dCQUNBRSxTQUFTO29CQUNQQyxNQUFNO2dCQUNSO2dCQUNBQyxXQUFXO29CQUNURCxNQUFNO2dCQUNSO2dCQUNBRSxNQUFNO29CQUNKSCxTQUFTO29CQUNURSxXQUFXO2dCQUNiO2dCQUNBRSxZQUFZO29CQUNWQyxTQUFTO29CQUNUQyxPQUFPO2dCQUNUO1lBQ0YsSUFFQTtnQkFDRU4sU0FBUztvQkFDUEMsTUFBTTtnQkFDUjtnQkFDQUMsV0FBVztvQkFDVEQsTUFBTTtnQkFDUjtnQkFDQUUsTUFBTTtvQkFDSkgsU0FBUztvQkFDVEUsV0FBVztnQkFDYjtnQkFDQUUsWUFBWTtvQkFDVkMsU0FBUztvQkFDVEMsT0FBTztnQkFDVDtZQUNGLENBQUM7UUFDTDtJQUNGLENBQUE7QUFJQSxNQUFNQyxRQUFRVixZQUFZQyxLQUFLO0FBRS9CUCxTQUFTaUIsVUFBVSxDQUFDQyxTQUFTQyxjQUFjLENBQUMsU0FBU0MsTUFBTSxDQUN6RCxxQkFBcUI7Y0FDckIsUUFBQ2xCO0lBQVNDLE9BQU9BO2NBQ2YsY0FBQSxRQUFDRTtRQUFjVyxPQUFPQTs7MEJBQ3BCLFFBQUNaOzs7OzswQkFDRCxRQUFDSCJ9