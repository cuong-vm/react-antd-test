import PropTypes from 'prop-types'
import { Link, To, useLocation } from 'react-router-dom'

type MenuItemProps = {
  to: To
  children: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = ({ to, children }) => {
  const { pathname } = useLocation()
  return (
    <Link to={to} className={pathname === to ? 'active' : ''}>
      {children}
    </Link>
  )
}

MenuItem.propTypes = {
  to: PropTypes.any.isRequired,
  children: PropTypes.node,
}

export default MenuItem
