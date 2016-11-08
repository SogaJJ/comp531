import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { editComment } from './articleActions'

const Comment = ({articleId, author, date, text, commentId, username, editComment}) => {
	let commentContent
	let originComment = text
	let editable = (username === author)

	const _editComment = () => {
		if (originComment !== commentContent.innerText) {
			editComment(commentContent.innerText)
		}
		
	}

	return (
		<div>
			<div className="col-md-9">
				<div className="col-md-12 comment-author-container"> 
					<span className="comment-author">{author}</span> comments on <span className="comment-date">{date} </span>
				</div>
				<div contentEditable="true" suppressContentEditableWarning={true} className="col-md-12 comment-content" > 
					<span className="comment-content" ref={ (node) => { commentContent = node }}>{text}</span>
				</div>
			</div>
			<div className="col-md-3 comment-update-container"> 
				{editable ? <button disabled={editable ? false : true} onClick={_editComment}> edit comment </button> : null}
			</div>
		</div>
	)
}

Comment.propTypes = {
	articleId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

export default connect(
	(state) => {
		return {
			username: state.profile.username
		}
	},
	(dispatch, ownProps) => {
		return {
			editComment: (text) => dispatch(editComment(ownProps.articleId, ownProps.commentId, text))
		}
	}

)(Comment)