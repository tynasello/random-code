import { Button } from '@material-ui/core'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import React, { SyntheticEvent, useState } from 'react'

type state = {
  message: string
  name: string
}

interface MessageBoxProps {
  socketRef: React.MutableRefObject<any>
  state: state
  setState: React.Dispatch<React.SetStateAction<state>>
}

function MessageBox({ socketRef, state, setState }: MessageBoxProps) {
  const [nameError, setNameError] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<boolean>(false)

  const onSend = (e: SyntheticEvent) => {
    e.preventDefault()
    const { name, message } = state
    if (!message || !name) return
    socketRef.current.emit('message', { name, message })
    setState({ ...state, message: '' })
  }

  const onTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.name === 'message')
      e.target.value ? setMessageError(false) : setMessageError(true)
    else if (e.target.name === 'name')
      e.target.value ? setNameError(false) : setNameError(true)

    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <CardContent>
      <form
        onSubmit={onSend}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          name="name"
          onChange={(e) => {
            onTextChange(e)
          }}
          value={state.name}
          label="Name"
          autoComplete="off"
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          style={{ marginTop: '1rem' }}
          error={nameError}
        />
        <TextField
          name="message"
          onChange={(e) => {
            onTextChange(e)
          }}
          value={state.message}
          label="Message"
          autoComplete="off"
          id="outlined-multiline-static"
          multiline
          rows={4}
          style={{ marginTop: '1rem' }}
          error={messageError}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Send
        </Button>
      </form>
    </CardContent>
  )
}

export default MessageBox
