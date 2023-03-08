import { Alert, List } from 'antd'
import React, { useEffect } from 'react'

// redux mapping
import { useDispatch, useSelector } from 'react-redux'
import { parseError } from '../helpers/utils'
import { AppDispatch, todosSelector } from '../redux/store'
import { fetchTodos } from '../services/todo-api'

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, todos } = useSelector(todosSelector)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (loading) return <strong>Loading please wait...</strong>
  if (error) return <Alert message={parseError(error)} type='error' />
  if (!todos) return <></>

  return (
    <div
      style={{
        textAlign: 'left',
      }}>
      <h4>Todo List ({todos.length})</h4>
      <div
        style={{
          minWidth: '200px',
          maxWidth: '400px',
          maxHeight: '300px',
          overflow: 'auto',
        }}>
        <List
          bordered
          dataSource={todos}
          renderItem={({ id, title, completed }) => (
            <List.Item key={id} style={completed ? { color: 'green' } : { color: 'darkblue' }}>
              {completed ? '✓' : '#'} {title}
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default TodoList
