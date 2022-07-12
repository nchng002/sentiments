import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()
const baseUrl = 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1'

export const AppContextProvider = ({ children }) => {
    const [userText, setUserText] = useState("")

    const getLightness = async () => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
            },
            body: JSON.stringify({
                "language": "english",
                "text": userText
            })
        })

        const responseData = await response.json()

        if (responseData.ok) {
            const bg = ((responseData.aggregate_sentiment.compound + 1) / 2) * 100
            document.body.style.background = `hsl(0, 0%, ${bg}%)`

            let textColour
            if (bg > 50) {
                textColour = 0
            } else {
                textColour = 100
            }

            document.getElementById('js-textarea-userintput').style.color = `hsl(0, 0%, ${textColour}%)`
        }
    }

    getLightness()


    return (
        <AppContext.Provider value={{ setUserText }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)