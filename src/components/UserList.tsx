import { Alert, List } from 'antd'
import React, { useEffect } from 'react'

// redux mapping
import { useDispatch, useSelector } from 'react-redux'
import { parseError } from '../helpers/utils'
import { loadUsers } from '../redux/slices/users'
import { AppDispatch, usersSelector } from '../redux/store'

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, users } = useSelector(usersSelector)

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  if (loading) return <strong>Loading please wait...</strong>
  if (error) return <Alert message={parseError(error)} type='error' />
  if (!users) return <></>

  return (
    <div
      style={{
        textAlign: 'left',
      }}>
      <h4>User List ({users.length})</h4>
      <div
        style={{
          minWidth: '200px',
          maxWidth: '400px',
          maxHeight: '300px',
          overflow: 'auto',
        }}>
        <List
          bordered
          dataSource={users}
          renderItem={({ name, city }) => (
            <List.Item key={name + '-' + city}>
              {name} from {city}
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default UserList
