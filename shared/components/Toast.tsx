import * as React from 'react'
import { Snackbar } from 'react-native-paper'

import { context } from '../context'
import { BORDER_RADIUS, COLORS, SPACING } from '../theme'
import Typography from './Typography'

const Toast = () => {
  const {
    state: { toast },
    dispatch,
  } = React.useContext(context)

  const onDismissSnackBar = React.useCallback(() => {
    dispatch({ type: 'TOAST', payload: null })
  }, [dispatch])

  if (toast === null) {
    return null
  }

  return (
    <Snackbar
      visible={toast !== null}
      duration={3000}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor: COLORS[toast.variant].opaque,
        borderRadius: BORDER_RADIUS.MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        margin: SPACING.md,
      }}
    >
      <Typography variant="body1" style={{ textAlign: 'center' }}>
        {toast?.message}
      </Typography>
    </Snackbar>
  )
}

export default Toast
