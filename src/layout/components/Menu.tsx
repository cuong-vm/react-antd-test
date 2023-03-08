import MenuItem from './MenuItem'

const Menu: React.FC = () => {
  return (
    <>
      <MenuItem to='/'>Home</MenuItem>
      <MenuItem to='/counter'>Counter</MenuItem>
      <MenuItem to='/todos'>Todos</MenuItem>
      <MenuItem to='/users'>Users</MenuItem>
    </>
  )
}

export default Menu
