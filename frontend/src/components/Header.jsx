import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, reset } from '../store/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='bg-gray-900 text-white shadow-md'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='text-2xl font-bold'>
          Meta Reviews
        </Link>
        <nav className='flex items-center gap-4'>
          {user ? (
            <>
              <Link to='/dashboard' className='hover:text-gray-300'>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='hover:text-gray-300'>
                Login
              </Link>
              <Link
                to='/register'
                className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition'
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
