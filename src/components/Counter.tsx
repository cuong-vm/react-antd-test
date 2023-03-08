import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/slices/counter'
import { State } from '../redux/store'

const Counter: React.FC = () => {
  const count = useSelector((state: State) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h3 className='count' data-testid='countNumber'>
        Count: {count}
      </h3>
      <button onClick={() => dispatch(increment())}>Increment</button>{' '}
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Counter
