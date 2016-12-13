import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleComment, beginComment, cancelComment, postComment, editPost } from './articleActions'
import Comment from './comment'



const Article = ({ username, id, author, date, text, comments, img, hideComments, toggleComment, addCommentStatus, beginComment, cancelComment, postComment, editPost}) => {
	
	let hasImg = (img !== undefined) && (img !== null)

	let editable = (author === username)

	let ongoingPost

	const _cancelComment = () => {
		ongoingPost.value = ''
		cancelComment()
	}

	const _postComment = () => {
		if (ongoingPost && ongoingPost.value) {
			postComment(ongoingPost.value)
			ongoingPost.value = ''
		}
	}

	const _editPost = () => {
		if (ongoingPost && ongoingPost.value) {
			editPost(ongoingPost.value)
			ongoingPost.value = ''
		}
	}

	return (
		<div className="article">
				<div className="col-md-12 article-author-container">
					<div className="col-md-6">
						<h5>
							<span className="article-author">{author}</span> said on <span className="article-date">{date} </span>
						</h5>
					</div>
				</div>

				<div className="col-md-12 article-container">
					
					{hasImg ? <img src={img} className="article-img"/> : ''}
					<div className="article-content">
						{text}
					</div>
					
				</div>
				
				<div className="col-md-12">
					<div className="col-md-6">
						<button className="btn btn-warning" onClick={toggleComment}> {hideComments ? "Show" : "Hide"} Comment ( {comments.length} )</button>
					</div>
					<div className="col-md-6">
						<button className="btn btn-success article-edit-btn" onClick={beginComment} disabled={addCommentStatus ? true : false}> Edit</button>
					</div>
	
				</div>

				<div className= {addCommentStatus ? "col-md-12" : "add-comment-container-not-shown"} >
					<div className="add-comment-container">
						<div className="col-md-9">
							<textarea className="article-edit-textarea" rows="5" cols="50" ref={ (node) => { ongoingPost = node }}></textarea>
						</div>
						<div className="col-md-3">
							<div className="row">
								<button className="btn btn-success" onClick={_postComment}> post comment</button>
							</div>
							<div className="row">
								<button className="btn btn-danger" onClick={_cancelComment}> cancel edit</button>
							</div>
							<div className="row">
								<button className="btn btn-primary article-edit-post-btn" onClick={_editPost} disabled={editable ? false : true}> edit post</button>
							</div>
						</div>
					</div>
					
				</div>




				<div className={hideComments ? "not-show-comment" : "col-md-12"}> 
					<div className="col-md-11 col-md-offset-1"> 
						{comments.map((it) => 
							<Comment key={it.commentId} author={it.author} date={it.date} commentId={it.commentId} text={it.text} articleId={id} />
						)}
					</div>
				</div>	
		</div>
	)
}


Article.propTypes = {
    //id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    //text: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    hideComments: PropTypes.bool.isRequired,
    toggleComment: PropTypes.func.isRequired,
    beginComment: PropTypes.func.isRequired,
    cancelComment: PropTypes.func.isRequired
}


export default connect(
	(state) => {
		return {
			username: state.profile.username
		}
	}
	, (dispatch, ownProps) => {
		return {
			toggleComment: () => dispatch(toggleComment(ownProps.id)),
			beginComment: () => dispatch(beginComment(ownProps.id)),
			cancelComment: () => dispatch(cancelComment(ownProps.id)),
			postComment: (text) => dispatch(postComment(ownProps.id, text)),
			editPost: (text) => dispatch(editPost(ownProps.id, text))
		}
	})(Article)