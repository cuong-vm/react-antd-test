import { Alert, Col, Row } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StaffForm, { StaffFormFields } from '../components/StaffForm'
import UserList from '../components/UserList'
import { parseError } from '../helpers/utils'
import { saveUser } from '../redux/slices/user-post'
import { AppDispatch, userPostSelector } from '../redux/store'

const UserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, result } = useSelector(userPostSelector)

  const onSave = (values: StaffFormFields) => {
    dispatch(saveUser(values))
  }

  const StaffSaveResult = () => {
    if (loading) return <strong>Saving please wait...</strong>
    if (error) return <Alert message={parseError(error)} type='error' />
    if (result) return <Alert message={result} type='success' />
    return null
  }

  return (
    <Row>
      <Col flex={1}>
        <StaffForm onSave={onSave} />
        <StaffSaveResult />
      </Col>
      <Col flex={1}>
        <UserList />
      </Col>
    </Row>
  )
}

export default UserPage
