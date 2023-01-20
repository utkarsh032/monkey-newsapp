import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propsTypes = {
    name: 'stranger',
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(
      this.props.category,
    )} - NewsMonkey`
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39e62ac5a83d41429c480e4c54d238f5&page=${this.state.page}&pageSize=${this.props.pageSize}  `

    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  async componentDidMount() {
    this.updateNews()
  }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39e62ac5a83d41429c480e4c54d238f5&page=${this.state.page}&pageSize=${this.props.pageSize}  `

    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  render() {
    console.log('propsTypes', this.props)
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '70px 0px' }}>
          NewsMonkey - Top from{' '}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((element) => {
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
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
          </div>
        </InfiniteScroll>

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

export default News
