import { CardContent, List, ListItem, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'

type state = {
  message: string
  name: string
}

interface ChatLogProps {
  chat: state[]
}

function ChatLog({ chat }: ChatLogProps) {
  const scrollRef: React.MutableRefObject<any> = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' })
    }
  }, [chat])

  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Chat
      </Typography>
      <List>
        {chat.map(({ name, message }, index) => (
          <ListItem
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '.5rem',
            }}
            key={index}
          >
            <Typography>{message}</Typography>
            <Typography variant="body2" color="text.secondary">
              {name}
            </Typography>
          </ListItem>
        ))}
        <li ref={scrollRef}></li>
      </List>
    </CardContent>
  )
}

export default ChatLog
