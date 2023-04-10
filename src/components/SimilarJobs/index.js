import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {HiShoppingBag} from 'react-icons/hi'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsList
  return (
    <li className="each-similar-card">
      <div className="card">
        <img src={companyLogoUrl} className="company-logo" alt="company logo" />
        <div className="title-rating">
          <h1 className="title">{title}</h1>
          <div className="card">
            <AiFillStar color="#fbbf24" />
            <p className="text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="title">Description</h1>
      <p className="text">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobs
