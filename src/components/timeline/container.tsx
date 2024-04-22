import { useMemo } from 'react'
import View from './view'

const TimelineContainer = () => {
  const steps = useMemo(() => [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
  ], [])

  const computedProps = {
    steps
  }
  return <View {...computedProps} />
}

export default TimelineContainer;
