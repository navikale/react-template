import React from "react"
import ReactDom from "react-dom"
import * as $ from "jquery"

import "./content/app.scss"
const a = <h1>Testing...</h1>;

ReactDom.render(a, $("#root")[0]);