import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='min-h-[calc(100vh-80px)] bg-gray-50'>
      <div className='container mx-auto px-4 py-12'>
        <h1 className='text-4xl font-bold mb-6'>
          Welcome, {user?.name}
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Link
            to='/'
            className='bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center'
          >
            <h2 className='text-2xl font-semibold mb-2'>View Reviews</h2>
            <p className='text-gray-600'>Explore all reviews</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
