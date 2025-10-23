import React from 'react'
import type { CompanyProfile } from '../types/fmp'
import formatMarketCap from '../utils/formatDescription'
import './Profile.css'

interface ProfileProps {
  companyProfile: CompanyProfile
}

const Profile: React.FC<ProfileProps> = ({ companyProfile }) => {
  return (
    <section className="profile-container">
      <div className="profile-grid">
        <div>
          <div className="content">
            <div>
              <span className="label">Exchange</span>
              <span className="value">{companyProfile.exchange}</span>
            </div>
            <div>
              <span className="label">IPO Date</span>
              <span className="value">{companyProfile.ipoDate}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="content">
            <div>
              <span className="label">Sector</span>
              <span className="value">{companyProfile.sector}</span>
            </div>
            <div>
              <span className="label">Industry</span>
              <span className="value">{companyProfile.industry}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="content">
            <div>
              <span className="label">CEO</span>
              <span className="value">{companyProfile.ceo}</span>
            </div>
            <div>
              <span className="label">Employees</span>
              <span className="value">{companyProfile.employees}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="content">
            <div>
              <span className="label">Market Cap</span>
              <span className="value">
                ${formatMarketCap(companyProfile.marketCap)}
              </span>
            </div>
            <div>
              <div>
                <div className="label">Address</div>
                <div className="value">
                  {companyProfile.address}, {companyProfile.city}, {companyProfile.state}{' '}
                  {companyProfile.zip}, {companyProfile.country}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="company-description">{companyProfile.description}</p>
    </section>
  )
}

export default Profile
