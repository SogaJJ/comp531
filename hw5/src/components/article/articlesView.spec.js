import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import ArticleView from './articlesView'

import Reducer from '../../reducers'

describe('ArticleView (component tests)', ()=> {
	
	it('should render articles', ()=>{

        const articles = [{_id:1, text:'aaa', author:'asdf', date:'2016-10-24',comments:[],img:''}]

        const node = shallow(
            <div>
                <ArticleView articles={articles} filterKeyword={_=>_} />
            </div>
        )
        expect(node.children().length).to.eql(1)
    })




})