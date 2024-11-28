import React from "react"
import ReactDOM from "react-dom/client"
import {Provider} from "react-redux"
import {store} from "./app/store"
import {BrowserRouter, HashRouter} from "react-router-dom"
import {App} from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
)