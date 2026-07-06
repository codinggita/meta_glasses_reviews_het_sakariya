import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl font-bold text-gray-900 mb-6'>
            Meta Glasses Reviews
          </h1>
          <p className='text-xl text-gray-600 mb-8'>
            Share your experience and explore reviews from users worldwide
          </p>
          <div className='flex gap-4 justify-center'>
            <Link
              to='/register'
              className='bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition'
            >
              Get Started
            </Link>
            <Link
              to='/login'
              className='bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-lg text-lg hover:bg-gray-50 transition'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
