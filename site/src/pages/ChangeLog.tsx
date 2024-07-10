import { Description } from '@mui/icons-material'
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import { type FC } from 'react'
import { pageWrapperCSS } from 'theme'

const changelogData: Array<{
  version: string
  date: string
  title: string
  notes: string[]
}> = [
    {
      version: '1.0.0',
      date: 'July 9th, 2024',
      notes: ['Create a Category', 'Create an Idea', 'Reflect on recorded Ideas', "Backup & Restore"],
      title: 'Initial Release'
    },
  ]

const Changelog: FC = () => {
  return (
    <Container css={pageWrapperCSS}>
      <Typography variant="h2" gutterBottom>
        Changelog
      </Typography>
      <Container css={{ maxWidth: '600px' }}>
        <List>
          {changelogData.map(entry => (
            <Box key={entry.date}>
              <Typography variant="h3">{`${entry.version} - ${entry.title}`}</Typography>
              <Typography variant="h4">{entry.date}</Typography>
              <List>
                {entry.notes.map((note, index) => (
                  <ListItem key={index}>
                    <Description sx={{ marginRight: '0.5rem' }} />
                    <ListItemText primary={note} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </List>
      </Container>
    </Container>
  )
}

export default Changelog
