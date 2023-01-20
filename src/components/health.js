import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class Health extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'health',
  }

  static propsTypes = {
    name: 'stranger',
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39e62ac5a83d41429c480e4c54d238f5&page=1&pageSize=${this.props.pageSize}`;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39e62ac5a83d41429c480e4c54d238f5&page=1&pageSize=${this.props.pageSize}  `

    console.log('component call hua ')
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  handlePrevClick = async () => {
    console.log('Previous')
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=39e62ac5a83d41429c480e4c54d238f5&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    })
  }

  handleNextClick = async () => {
    console.log('Next')
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=39e62ac5a83d41429c480e4c54d238f5&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`
      this.setState({ loading: true })
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData)

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      })
    }
  }

  render() {
    console.log('render')
    console.log('propsTypes', this.props)
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0px' }}>
          NewsMonkey - Top Headline
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ''}
                    descripition={
                      element.description
                        ? element.description.slice(0, 80)
                        : ''
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              )
            })}
        </div>
        <div className="container ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-outline-dark float-end"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default Health
