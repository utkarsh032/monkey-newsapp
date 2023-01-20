import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props
  return (
    <div className="my-3">
      <div className="card">
        <div
        // style={{
        //   display: 'flex',
        //   justifyContent: 'flex-end',
        //   position: 'absolute',
        //   right: '0',
        // }}
        >
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
            style={{ left: '90%', zIndex: '1' }}
          >
            {source}
          </span>
        </div>
        <img
          className="card-img-top"
          src={
            !imageUrl
              ? 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
              : imageUrl
          }
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}... </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? 'Unknown' : author} on{' '}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
