import { Box, Card } from '@material-ui/core'
import { Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import ChatLog from './components/ChatLog'
import MessageBox from './components/MessageBox'

type state = {
  message: string
  name: string
}

function App() {
  const socketRef: React.MutableRefObject<any> = useRef()

  const [state, setState] = useState<state>({ message: '', name: '' })
  const [chat, setChat] = useState<state[]>([])

  useEffect(() => {
    socketRef.current = io('https://acrochat-server.herokuapp.com/')

    socketRef.current.on('message', ({ name, message }: state) => {
      setChat([...chat, { name, message }])
    })
    return () => socketRef.current.disconnect()
  }, [chat])

  return (
    <Box
      sx={{ m: 3 }}
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ p: 3 }}>
        Acrochat
      </Typography>
      <Card variant="outlined" style={{ width: '300px' }}>
        <MessageBox
          socketRef={socketRef}
          state={state}
          setState={setState}
        ></MessageBox>
      </Card>
      <Card
        variant="outlined"
        style={{
          marginTop: '2rem',
          height: '500px',
          width: '500px',
        }}
      >
        <ChatLog chat={chat}></ChatLog>
      </Card>
    </Box>
  )
}

export default App
