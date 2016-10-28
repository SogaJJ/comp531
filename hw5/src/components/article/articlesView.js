import React from 'react'
import { connect } from 'react-redux'
import Article from './article'
import {filterKeyword} from './articleActions'

const processArticles = ( {originArticles, keyword }) => {
	let filteredArticles
	if (keyword === '') {
		filteredArticles = originArticles
	} else {
		filteredArticles = originArticles.filter((article) => {
			return article.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
				   article.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
		})
	} 
	let sortedFilteredArticles = filteredArticles.sort((article1, article2)=> {
		return article2.date - article1.date
	})
	return sortedFilteredArticles
}


const ArticleView = ({ articles, keyword, filterKeyword }) => {
	let keywordInput = ''

	let originArticles = Object.keys(articles).sort().map((_id) => articles[_id])

	let processededArticles = processArticles({originArticles, keyword})


	const _filterKeyword = () => {
		filterKeyword(keywordInput.value)
	}
	return (
		<div>

			<div className="row post-container">
				<div className="col-md-12">
					<input type="text" className="post-field" size={50} />
					<button className="btn btn-info" > Post Article </button>
				</div>	
			</div>

			<div className="row">
				<div className="col-md-12">
					<input type="text" size={50} ref={ (node) => { keywordInput = node }} />
					<button className="btn btn-info" onClick={_filterKeyword}> Filter </button>
				</div>	
			</div>


			<div>			
				{processededArticles.map((articleObj) => 
						<Article key = {articleObj._id}
								 author = {articleObj.author}
								 date = {new Date(articleObj.date).toDateString()}
								 text = {articleObj.text}
								 comments = {articleObj.comments}
								 displayComments = {false}
						/>
					)	
				}
			</div>
		</div>
	)
} 

export default connect(
	(state) => {
		return {
			articles: state.article.articles,
			keyword: state.article.keyword
		}
	},
	(dispatch) => {
		return {
			filterKeyword: (keyword) => dispatch(filterKeyword(keyword))
		}
	}
)(ArticleView)