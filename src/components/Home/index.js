import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const findJobsClick = () => <Redirect to="/jobs" />

  return (
    <>
      <Header />
      <div className="bg-home-container">
        <h1 className="heading">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="description">
          Millions of people are searching for jobs, salary
          <br />
          information,company reviews.Find the job that fits your
          <br />
          abilities and potential
        </p>
        <Link to="/jobs">
          <button
            className="find-jobs-button"
            onClick={findJobsClick}
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home
