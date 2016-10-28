import React from 'react'
import { connect } from 'react-redux'
import  ArticleView from '../article/articlesView'
import Headline from './headline'
import FollowingView from './following'
import NaviBar from '../main/nav'

const Main = () => {
	return (
		<div className="main_page_container">
			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<div className="row">
						<div className="col-md-3">
							<NaviBar />
						</div>
						<div className="col-md-9 main-header">
							<h1>Welcome come to Rice Zone!</h1>
						</div>

					</div>

					
				</div>
			</div>
			<div className="col-md-12"> 
				<div className="col-md-4"> 
					<Headline />


					<div className="col-md-12"> 
						<FollowingView />
					</div>
				</div>

				<div className="col-md-7"> 
					<ArticleView />
				</div>
			</div>
		</div>
	)
}

export default connect()(Main)