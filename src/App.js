import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Hero from "components/hero/FullWidthWithImage"

function App() {
    return (
        <AnimationRevealPage>
            <Hero />
        </AnimationRevealPage>
    )
}

export default App