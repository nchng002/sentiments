import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()
const baseUrl = 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1'

export const AppContextProvider = ({ children }) => {
    const [userText, setUserText] = useState("")
    const [lightness, setLightness] = useState()
    const [textColour, setTextColour] = useState()

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

        try {
            const responseData = await response.json()
            let bg = ((responseData.aggregate_sentiment.compound + 1) / 2) * 100
            let colour
            if (bg > 50) {
                colour = 0
            } else {
                colour = 100
            }
            setLightness(bg)
            setTextColour(colour)
        } catch (error) {
            setLightness(50)
            setTextColour(0)
        }

    }
    getLightness()


    return (
        <AppContext.Provider value={{ setUserText, lightness, textColour }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)