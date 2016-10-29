import React from 'react'
import { connect } from 'react-redux'

const Comment = ({it}) => {
	return (
		<div>
			<div className="col-md-12 comment-author-container"> 
				<span className="comment-author">{it.author}</span> comments on <span className="comment-date">{it.date} </span>
			</div>
			<div className="col-md-12 comment-content"> 
				<span className="comment-content">{it.text}</span>
			</div>
		</div>
	)
}


const Article = ({ author, date, text, comments, displayComments}) => {
	return (
		<div>
			
				<div className="col-md-12 article-author-container">
					<div className="col-md-6">
						<h5>
							<span className="article-author">{author}</span> said on <span className="article-date">{date} </span>
						</h5>
					</div>
					<div className="col-md-3">
						<button className="btn btn-warning"> Show Comment </button>
					</div>
					<div className="col-md-3">
						<button className="btn btn-success"> Add Comment </button>
					</div>
				</div>


				<div className="col-md-12 article-container">
					{text}
				</div>

				

				

				<div className="col-md-12"> 
					<div className="col-md-11 col-md-offset-1"> 
						{comments.map((it) => 
							<Comment key={it.commentId} it={it} />
						)}
					</div>
				</div>
			
		</div>
	)
}

export default connect()(Article)