// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'
function FallabackError({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary} className="error-btn">
        Rest
      </button>
    </div>
  )
}

// function ErrorBoundary() {
//   return error?props.fallback:props.children
// }

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {error: null}
//   }
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     return this.state.error ? (
//       <div role="alert">
//         There was an error:{' '}
//         <pre style={{whiteSpace: 'normal'}}>{this.state.error.message}</pre>
//       </div>
//     ) : (
//       this.props.children
//     )
//   }
// }

function PokemonInfo({pokemonName}) {
  const [{pokemon, status}, setPokemonData] = React.useState({
    status: 'idle',
    pokemon: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return
    setPokemonData({status: 'pending'})

    fetchPokemon(pokemonName)
      .then(pokemon => {
        setPokemonData({status: 'resolved', pokemon})
      })
      .catch(e => {
        setPokemonData({status: 'rejected'})
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'submit pokemon'
  }
  if (status === 'rejected') throw new Error('something went wrong 💥💥💥')

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  throw new Error('impossible case 💥💥💥')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={FallabackError}
          onReset={() => {
            setPokemonName('')
          }}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
