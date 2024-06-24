import IdeaInput from '@/components/brainstorm/IdeaInput'
import LabelSelect from '@/components/brainstorm/LabelSelect'
import NewLabelInput from '@/components/brainstorm/NewLabelInput'
import { useFocusEffect } from 'expo-router'
import * as React from 'react'

enum CurrentPage {
  IdeaInput = 'ideaInput',
  LabelSelect = 'labelSelect',
  NewLabelInput = 'newLabelInput',
}

const Brainstorm = () => {
  const [currentPage, setCurrentPage] = React.useState(CurrentPage.LabelSelect)
  const [selectedLabelId, setSelectedLabelId] = React.useState('')
  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(CurrentPage.LabelSelect)
      setSelectedLabelId('')
    }, [])
  )

  const labelSelectSubmitCallback = React.useCallback((labelId: string) => {
    setSelectedLabelId(labelId)
    setCurrentPage(CurrentPage.IdeaInput)
  }, [])

  const newLabelSubmitCallback = React.useCallback(
    ({ labelId }: { labelId: string }) => {
      setSelectedLabelId(labelId)
      setCurrentPage(CurrentPage.IdeaInput)
    },
    []
  )

  const newLabelCancelCallback = React.useCallback(() => {
    setCurrentPage(CurrentPage.LabelSelect)
  }, [])

  const ideaInputSubmitCallback = React.useCallback(() => {
    setCurrentPage(CurrentPage.LabelSelect)
  }, [])

  const ideaInputCancelCallback = React.useCallback(() => {
    setCurrentPage(CurrentPage.LabelSelect)
  }, [])

  switch (currentPage) {
    case CurrentPage.LabelSelect:
      return (
        <LabelSelect
          submitCallback={labelSelectSubmitCallback}
          newLabelCallback={() => setCurrentPage(CurrentPage.NewLabelInput)}
        />
      )
    case CurrentPage.NewLabelInput:
      return (
        <NewLabelInput
          cancelCallback={newLabelCancelCallback}
          submitCallback={newLabelSubmitCallback}
        />
      )
    case CurrentPage.IdeaInput:
      return (
        <IdeaInput
          labelId={selectedLabelId}
          cancelCallback={ideaInputCancelCallback}
          submitCallback={ideaInputSubmitCallback}
        />
      )

    default:
      return null
  }
}

export default Brainstorm
