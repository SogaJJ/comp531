import React from 'react'
import { connect } from 'react-redux'
import Article from './article'
import { filterKeyword, postArticle } from './articleActions'

export function processArticles (articles, keyword ) {
	
	let originArticles = Object.keys(articles).sort().map(_id => articles[_id])

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


const ArticleView = ({ articles, filterKeyword, postArticle }) => {
	let keywordInput = ''
	let newArticle

	let fd = new FormData()

	const _filterKeyword = () => {
		filterKeyword(keywordInput.value)
	}
	
	const _postArticle = () => {
		fd.append('text', newArticle.value)
		console.log(fd)
		newArticle.value = ''
		postArticle(fd)
		fd = new FormData()
	}

	const handleImageChange = (e) => {
		fd.append('image', e.target.files[0]);
		console.log(fd)
	}

	return (
		<div>

			<div className="row post-container">
				<form>
					<div className="col-md-3">
						<input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
					</div>

					<div className="col-md-6">
						<textarea className="textarea" cols={50} rows={30} ref={ (node) => { newArticle = node }}/>
						
					</div>	

					<div className="col-md-6">
						<input type="button" className="btn btn-info" onClick={_postArticle} value="Post Article" />
					</div>	

				</form>
				
			</div>

			<div className="row">
				<div className="col-md-12">
					<input type="text" size={50} ref={ (node) => { keywordInput = node }} />
					<button className="btn btn-info" onClick={_filterKeyword}> Filter </button>
				</div>	
			</div>


			<div>			
				{articles.map((articleObj) => 
						<Article key = {articleObj._id}
								 id = {articleObj._id}
								 author = {articleObj.author}
								 date = {new Date(articleObj.date).toDateString()}
								 text = {articleObj.text}
								 comments = {articleObj.comments}
								 hideComments = {articleObj.showComments}
								 addCommentStatus = {articleObj.addCommentStatus}
								 img = {articleObj.img}
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
			articles: processArticles( state.article.articles, state.article.keyword)
		}
	},
	(dispatch) => {
		return {
			filterKeyword: (keyword) => dispatch(filterKeyword(keyword)),
			postArticle: (text) => dispatch(postArticle(text))
		}
	}
)(ArticleView)