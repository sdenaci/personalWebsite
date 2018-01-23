import React from 'react'
import Link from 'gatsby-link'

import './index.css'



export default ({ children, data }) =>
  <div className="bodyContainer">
    <div className="bodyDiv">
      <div className="parentDiv">
        <nav>
            <div id="nameLinkContainer">
              <Link to={`/`} id="nameLink">
                  sarah denaci
              </Link>
            </div>
          <div className="header">
            <Link to={`/`}>
                about
            </Link>
            <Link to={`/projects`}>
                projects
            </Link>
            <Link to={`/blog`}>
                blog
            </Link>
          </div>
        </nav>
      </div>

      <div>
        {children()}
      </div>
    </div>

  </div>
