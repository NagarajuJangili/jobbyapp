import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import {HiShoppingBag} from 'react-icons/hi'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobDetailsUpdated = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }
      const skillsList = fetchedData.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const lifeAtCompanyList = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }
      const similarJobsList = fetchedData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: jobDetailsUpdated,
        skills: skillsList,
        lifeAtCompany: lifeAtCompanyList,
        similarJobs: similarJobsList,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  getTotalDetails = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-details-container">
        <div className="job-card">
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
          <div className="location-package">
            <p className="title">Description</p>
            <div className="card">
              <a href={companyWebsiteUrl} className="text">
                Visit
              </a>
              <FiExternalLink color="#b6c5ff" />
            </div>
          </div>

          <p className="text">{jobDescription}</p>
          <h1 className="title">Skills</h1>
          <ul className="all-skills">
            {skills.map(each => (
              <li className="each-skill">
                <img src={each.imageUrl} className="skill-logo" alt="skills" />
                <p className="text">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="title">Life at Company</h1>
          <div className="life-company">
            <p className="text">{description}</p>
            <img
              src={imageUrl}
              className="life-company-image"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="title">Similar Jobs</h1>
        <ul className="all-similar-jobs">
          {similarJobs.map(each => (
            <SimilarJobs similarJobsList={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  onLadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-caption">
        We cannot to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  onRenderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.getTotalDetails()
      case apiConstantStatus.inProgress:
        return this.onLadingView()
      case apiConstantStatus.failure:
        return this.onFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.onRenderStatus()}</div>
      </>
    )
  }
}
export default JobItemDetails
