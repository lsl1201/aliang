import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import router from "./router/index.jsx";
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* direction="rtl"  这是什么 */}
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b', borderRadius: '#00b96b', } }}>
      <Provider store={store}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
)
