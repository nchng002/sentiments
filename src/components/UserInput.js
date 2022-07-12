import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import { useAppContext } from '../contexts/AppContextProvider'

const UserInput = () => {
  const [input, setInput] = useState("")
  const { setUserText } = useAppContext()
  const [debounceValue] = useDebounce(input, 300)

  const increaseTextAreaHeight = (e) => {
    const height = document.getElementById('js-textarea-userintput').offsetHeight

    if (e.target.value === '') {
      document.getElementById('js-textarea-userintput').style.height = '100px'
      setUserText('')
    } else if (e.key === 'Enter') {
      document.getElementById('js-textarea-userintput').style.height = `${height + 30}px`
    } else {
      const factor = Math.floor(input.length / 100)
      document.getElementById('js-textarea-userintput').style.height = `${height + factor}px`
    }

  }

  useEffect(() => {
    if (debounceValue) {
      setUserText(input)
    }
  }, [debounceValue, input, setUserText])

  //
  return (
    <div>
      <textarea
        className='container textarea--mods'
        value={input}
        onChange={(e) => { setInput(e.target.value); increaseTextAreaHeight(e) }}
        onKeyPress={(e) => increaseTextAreaHeight(e)}
        placeholder='Type something...'
        id='js-textarea-userintput'
      >
      </textarea>
    </div>
  )
}

export default UserInput