import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../redux/store'

const { TextArea } = Input

export type StaffFormFields = {
  name: string
  jobTitle: string
  tags: string[]
  notes?: string
}

const StaffForm: React.FC<{ onSave?: (values: StaffFormFields) => void }> = ({ onSave }) => {
  const jobtitles = useSelector((state: State) => state.jobtitles)
  const tags = useSelector((state: State) => state.tags)
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const onValuesChange = (changedValues: StaffFormFields, allValues: StaffFormFields) => {
    const { name, jobTitle, tags } = allValues
    if (!name || !jobTitle || !tags || !tags.length) {
      setSubmitDisabled(true)
    } else {
      setSubmitDisabled(false)
    }
  }

  const onFinish = (values: StaffFormFields) => {
    onSave && onSave(values)
  }

  return (
    <Form
      data-testid='staffForm'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 400, margin: 'auto' }}
      initialValues={{ jobTitle: '' }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      autoComplete='off'>
      <Form.Item
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input data-testid='nameField' allowClear={true} placeholder='name' />
      </Form.Item>
      <Form.Item
        label='Job title'
        name='jobTitle'
        rules={[{ required: true, message: 'Please input job title!' }]}>
        <Select
          data-testid='jobTitleField'
          allowClear={true}
          style={{ width: 200 }}
          placeholder='title'
          options={jobtitles}
        />
      </Form.Item>
      <Form.Item
        label='Tags'
        name='tags'
        rules={[{ required: true, message: 'Please input your tags!' }]}>
        <Select
          data-testid='tagsField'
          mode='tags'
          style={{ width: '100%' }}
          placeholder='tags'
          options={tags}
        />
      </Form.Item>
      <Form.Item label='Notes' name='notes'>
        <TextArea data-testid='notesField' allowClear={true} rows={4} placeholder='notes' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button data-testid='saveButton' type='primary' htmlType='submit' disabled={submitDisabled}>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default StaffForm
