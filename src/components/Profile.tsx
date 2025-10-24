import React, { useState } from 'react'
import type { CompanyProfile } from '../types/fmp'
import formatMarketCap from '../utils/formatDescription'
import { truncateByWords } from '../utils/text'
import './Profile.css'

interface ProfileProps {
  companyProfile: CompanyProfile
}

const Profile: React.FC<ProfileProps> = ({ companyProfile }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded((prev) => !prev)

  const shouldTruncate = companyProfile.description.length > 350
  const displayedText = !shouldTruncate || expanded
    ? companyProfile.description
    : truncateByWords(companyProfile.description)

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
              <span className="value">{companyProfile.ceo || 'N/A'}</span>
            </div>
            <div>
              <span className="label">Employees</span>
              <span className="value">{companyProfile.employees || 'N/A'}</span>
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
                  {[companyProfile.address,
                    companyProfile.city,
                    companyProfile.state,
                    companyProfile.zip,
                    companyProfile.country].filter(Boolean).join(', ') || 'N/A'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="company-description">
        <p>
          {displayedText}
          {shouldTruncate && (
            <span
              onClick={toggleExpanded}
              className="read-more-text"
              aria-expanded={expanded}
              aria-label={expanded ? '(read less)' : '(read more)'}
            >
              {expanded ? '(read less)' : '(read more)'}
            </span>
          )}
        </p>
      </div>
    </section>
  )
}

export default Profile
