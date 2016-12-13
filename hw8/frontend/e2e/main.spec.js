import { expect } from 'chai'
import { go, sleep, findId, findClassname, findCSS, By } from './selenium'
import common from './common'

describe('Test Main page...', () => {


    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('Create new article and validate article appears in feed', (done) => {
        let newArticle = "some text..."
        let prevArticleCount
        sleep(500)
        .then(findClassname('article').then(articles => {
            prevArticleCount = articles.length
        }))
        .then(findId('article-post-textarea').sendKeys(newArticle))
        .then(findId('article-post-btn').click())
        .then(sleep(1000))
        .then(findClassname('article').then(articles => {
            expect(articles.length).to.eql(prevArticleCount + 1)
        }))
        .then(findClassname('article-content').then(articles => articles[0].getText())
            .then(article => {
            expect(article).to.eql(newArticle)
        }))
        .then(done)
    })

    it('Edit an article and validate changed article text', (done) => {
        let oldPost
        let newPost
        sleep(500)
        .then(findId('article-post-textarea').sendKeys('this is a post for e2e test'))
        .then(findId('article-post-btn').click())
        .then(sleep(1000))
        .then(findClassname('article-content').then(articles => articles[0].getText())
            .then(article => {
            oldPost = article
        }))
        .then(sleep(500))
        .then(findClassname('article-edit-btn')
            .then(editBtns => editBtns[0].click())
        )
        .then(sleep(500))
        .then(findClassname('article-edit-textarea')
            .then(textareas => {
                newPost = oldPost + ' modified'
                textareas[0].sendKeys(newPost)
            })
        )
        .then(sleep(500))
        .then(findClassname('article-edit-post-btn')
            .then(btns => btns[0].click())
        )
        .then(sleep(1000))
        .then(findClassname('article-content').then(articles => articles[0].getText())
            .then(article => {
                expect(article).to.eql(newPost)
        }))
        .then(done)
    })

    it('Update headline headline and verify change', (done) => {
        let oldHeadline
        let newHeadline
        sleep(500)
        .then(findId('main-headline').getText().then(text => {
            oldHeadline = text
        }))
        .then(sleep(500))
        .then(findId('main-headline-field').then(field => {
            newHeadline = 'new modified ' + oldHeadline
            field.sendKeys(newHeadline)
        }))
        .then(sleep(500))
        .then(findId('main-headline-udpate-btn').click())
        .then(sleep(2000))
        .then(findId('main-headline').getText().then(text => {
            expect(text).to.eql(newHeadline)
        }))
        .then(findId('main-headline-field').sendKeys(oldHeadline))
        .then(sleep(500))
        .then(findId('main-headline-udpate-btn').click())
        .then(done)
    })

    it('Add the Follower user and verify following count increases by one', (done) => {
        let oldFollowerCount
        sleep(500)
        .then(findClassname('follower').then(followers => {
            console.log(followers.length)
            oldFollowerCount = followers.length
        }))
        .then(findId('add-follower-field').sendKeys('Follower'))
        .then(findId('add-follower-btn').click())
        .then(sleep(2000))
        .then(findClassname('follower').then(followers => {
            expect(followers.length).to.eql(oldFollowerCount + 1)
        }))
        .then(done)
    })

    it('Remove the Follower user and verify following count decreases by one, test should be safe', (done) => {
        let oldFollowerCount
        sleep(500)
        .then(findClassname('follower').then(followers => {
            oldFollowerCount = followers.length
        }))
        .then(findClassname('follower-name').then(names => {
            
            let idx = 0
            names.forEach(name => {
                name.getText().then(text => {
                    if (text == 'Follower') {
                        findClassname('unfriend-btn').then(btns => {
                            btns[0].click()
                        })
                    }
                    idx = idx + 1
                })
            })
            
        }))
        .then(sleep(2000))
        .then(findClassname('follower').then(followers => {
            expect(followers.length).to.eql(oldFollowerCount - 1)
        }))
        .then(done)
    })

    it('Search for special &quot;Only One Article Like This&quot; article and verify author', (done) => {
        
        sleep(500)
        .then(findId('keyword-field').sendKeys('Only One Article Like This'))
        .then(findId('keyword-filter-btn').click())
        .then(findClassname('article').then(articles => {
            expect(articles.length).to.eql(1)
        }))
        .then(done)
    })

    after('should logout', (done) => {
        sleep(500)
        .then(common.logout)
        .then(done)
    })
})
