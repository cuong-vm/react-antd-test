import { Col, Row } from 'antd'
import React, { useState } from 'react'
import StaffForm, { StaffFormFields } from '../components/StaffForm'
import TodoList from '../components/TodoList'

const TodoPage: React.FC = () => {
  const [output, setOutput] = useState('')

  const onSave = (values: StaffFormFields) => {
    setOutput(JSON.stringify(values, null, 2))
  }

  return (
    <Row>
      <Col flex={1}>
        <StaffForm onSave={onSave} />
        {output !== '' && (
          <pre data-testid='output' className='App-code'>
            {output}
          </pre>
        )}
      </Col>
      <Col flex={1}>
        <TodoList />
      </Col>
    </Row>
  )
}

export default TodoPage
