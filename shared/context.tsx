import { createContext, useReducer, type Dispatch } from 'react'

// Note - this file is probably currently overkill for dispatching just TOASTS.
// Of additional note - it might have been the `isLoading` for Context for fetching
// keys from local storage that caused SplashScreen.hideAsync() not to fire. So,
// note to future self, if you add keys back in, check with a fresh install of the app.
// Simulator -> Device -> Erase all content and settings

export interface State {
  toast: {
    message: string
    variant: 'SUCCESS' | 'ERROR' | 'WARNING'
  } | null
}

const EMPTY_STATE: State = {
  toast: null,
}

interface Toast {
  type: 'TOAST'
  payload: State['toast']
}

export type Action = Toast

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOAST': {
      return { ...state, toast: action.payload }
    }
    default:
      throw new Error('Unexpected action')
  }
}

const context = createContext({
  state: EMPTY_STATE,
  dispatch: () => { },
} as {
  state: State
  dispatch: Dispatch<Action>
})

const ResultsContext = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, EMPTY_STATE)

  const { Provider } = context

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export default ResultsContext
export { context }
