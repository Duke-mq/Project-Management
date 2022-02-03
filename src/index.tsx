import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";
/*务必将antd的样式放置dev-tool后面，因为会覆盖掉dev-tool*/
import 'antd/dist/antd.less'
loadDevTools(() =>
    ReactDOM.render(
        <React.StrictMode>
            <AppProviders>
                <App />
            </AppProviders>
        </React.StrictMode>,
        document.getElementById("root")
    )
);

reportWebVitals();
