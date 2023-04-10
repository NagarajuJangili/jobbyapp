import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiStatus: apiConstantStatus.initial,
      userSearch: '',
      employmentType: '',
      salaryRange: '',
      jobsList: [],
      profileShow: false,
      profileList: {},
    }
  }

  componentDidMount() {
    this.getJobData()
    this.getProfileData()
  }

  getSearchValue = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      this.setState({apiStatus: apiConstantStatus.initial})
    }
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)

    if (response.ok) {
      const fetchedProfile = await response.json()

      const profileCardList = {
        name: fetchedProfile.profile_details.name,
        profileImageUrl: fetchedProfile.profile_details.profile_image_url,
        shortBio: fetchedProfile.profile_details.short_bio,
      }
      this.setState({profileShow: true, profileList: profileCardList})
    }
  }

  getJobData = async () => {
    this.setState({apiStatus: apiConstantStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {userSearch, employmentType, salaryRange} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${userSearch}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const jobList = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState(
        {
          jobsList: jobList,
          apiStatus: apiConstantStatus.success,
        },
        this.getSearchValue(),
      )
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  profileCard = () => {
    const {profileList} = this.state

    return (
      <div className="prof-card">
        <img
          className="profile-logo"
          src={profileList.profileImageUrl}
          alt="profile"
        />
        <h1 className="name-head">{profileList.name}</h1>
        <p className="job-role">{profileList.shortBio}</p>
      </div>
    )
  }

  getAllJobs = () => {
    const {jobsList} = this.state
    return (
      <ul className="all-jobs">
        {jobsList.map(each => (
          <JobItem jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onClickEmployment = id => {
    this.setState({employmentType: id}, this.getJobData())
  }

  onClickSalary = salaryId => {
    this.setState({salaryRange: salaryId}, this.getJobData())
  }

  clickRetry = () => {
    this.getJobData()
  }

  clickRetryProfile = () => {
    this.getProfileData()
  }

  onLoadingView = () => (
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

  onSearchValue = event => {
    this.setState({userSearch: event.target.value}, this.getJobData())
  }

  onRenderAllStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.getAllJobs()
      case apiConstantStatus.isProgress:
        return this.onLoadingView()
      case apiConstantStatus.failure:
        return this.onFailureView()
      default:
        return this.searchNoJobs()
    }
  }

  render() {
    const {profileShow, profileList} = this.state
    console.log(profileList)

    return (
      <>
        <Header />
        <div className="job-home">
          <div className="first-container">
            <div className="profile-card">
              {profileShow ? (
                this.profileCard()
              ) : (
                <button
                  className="retry-btn"
                  type="button"
                  onClick={this.clickRetryProfile}
                >
                  Retry
                </button>
              )}
            </div>
            <hr />

            <div className="category-card">
              <h1 className="category-heading">Type of Employment</h1>
              <ul className="category-list">
                {employmentTypesList.map(each => (
                  <li className="list-items">
                    <input
                      type="checkbox"
                      id="checkbox"
                      key={each.employmentTypeId}
                      onChange={this.onClickEmployment(each.employmentTypeId)}
                    />
                    <label htmlFor="checkbox" className="each">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr />

            <div className="category-card">
              <h1 className="category-heading">Salary Range</h1>
              <ul className="category-list">
                {salaryRangesList.map(each => (
                  <li className="list-items">
                    <input
                      type="checkbox"
                      id="checkbox"
                      key={each.salaryRangeId}
                      onChange={this.onClickSalary(each.salaryRangeId)}
                    />
                    <label htmlFor="checkbox" className="each">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-container">
            <div className="search-card">
              <input
                type="search"
                onChange={this.onSearchValue}
                className="search-bar"
              />
              <button type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.onRenderAllStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
