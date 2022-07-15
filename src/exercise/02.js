// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(() => {
    let intialNameValue = window.localStorage.getItem('name') ?? initialName
    console.log('intialLazy value 🐱‍🏍🐱‍🏍🐱‍🏍')
    return intialNameValue
  })

  function callback() {
    localStorage.setItem('name', name)
  }
  React.useEffect(callback, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="mahdi" />
}

export default App
