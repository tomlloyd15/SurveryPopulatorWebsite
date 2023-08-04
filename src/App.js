import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Hero from "components/hero/FullWidthWithImage"
import GetStarted from "test_pages/Homepage1"



function App() {

    return (
        <AnimationRevealPage>
            <GetStarted />
        </AnimationRevealPage>
    )
}

export default App