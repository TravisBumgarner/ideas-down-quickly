import { Description, BugReport } from '@mui/icons-material'
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import { type FC } from 'react'
import { COLORS, pageWrapperCSS } from 'theme'

enum NoteType {
  Feature = 'feature',
  BugFix = 'bugfix'
}

const noteTypeToIcon = {
  [NoteType.Feature]: Description,
  [NoteType.BugFix]: BugReport
}

const noteTypeToColor = {
  [NoteType.Feature]: COLORS.SUCCESS['300'],
  [NoteType.BugFix]: COLORS.ERROR['300']
} as const

const changelogData: Array<{
  version: string
  date: string
  title: string
  notes: { type: NoteType, text: string }[]
}> = [
  {
    version: '1.3.0',
    date: 'August 27th, 2024',
    notes: [{
      type: NoteType.BugFix,
      text: "Improve cancel button behavior when adding an idea after creating a category"
    }, {
      type: NoteType.BugFix,
      text: "Fix keyboard not dismissible when trying to delete database"
    },
    {
      type: NoteType.Feature,
      text: "Add feedback request"
    },
    ],
    title: 'Small Improvements'
  },
    {
      version: '1.2.0',
      date: 'August 3rd, 2024',
      notes: [{
        type: NoteType.Feature,
        text: "Replace dropdown for category select/filter with modal"
      }, {
        type: NoteType.BugFix,
        text: "Help messages displaying at the incorrect time"
      }, {
        type: NoteType.BugFix,
        text: "Filter to empty list caused incorrect UI"
      }, {
        type: NoteType.Feature,
        text: "Add feedback button to settings page"
      }
      ],
      title: 'Dropdown Replacement & Bug Fixes'
    },
    {
      version: '1.1.10',
      date: 'July 18th, 2024',
      notes: [
        { type: NoteType.Feature, text: 'Implement Create a Category', },
        { type: NoteType.Feature, text: 'Implement Create an Idea', },
        { type: NoteType.Feature, text: 'Implement Reflect on recorded Ideas', },
        { type: NoteType.Feature, text: "Implement Backup & Restore" },
      ],
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
                {entry.notes.map((note, index) => {
                  const Icon = noteTypeToIcon[note.type]
                  return (
                    <ListItem key={index}>
                      <Icon sx={{ marginRight: '0.5rem', color: noteTypeToColor[note.type] }} />
                      <ListItemText primary={note.text} />
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          ))}
        </List>
      </Container>
    </Container>
  )
}

export default Changelog
