import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import {HiShoppingBag} from 'react-icons/hi'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="each-item">
      <Link to={`/jobs/:${id}`}>
        <div className="card">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-rating">
            <h1 className="title">{title}</h1>
            <div className="card">
              <AiFillStar color="#fbbf24" />
              <p className="text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package">
          <div className="card">
            <div className="card">
              <MdLocationOn color="#ffffff" />
              <p className="text">{location}</p>
            </div>
            <div className="card">
              <HiShoppingBag color="#ffffff" />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <h1 className="title">{packagePerAnnum}</h1>
        </div>
        <hr color="#ffffff" />
        <p className="title">Description</p>
        <p className="text">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
