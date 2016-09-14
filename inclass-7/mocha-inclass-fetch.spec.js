//
// Mocha is a test runner https://mochajs.org/
//
// Chai is an assertion library http://chaijs.com/
//

// expect is behavior driven development (bdd) style assertions
const expect = chai.expect;

describe(`Mocha+Chai Inclass Fetch Exercise for "${inclass.author}"`, () => {
    const baseURL = 'https://webdev-dummy.herokuapp.com'
    const sample = `${baseURL}/sample`

    let longest = null

    const findLargest = (done) => {
        if (!longest) {
            try {
                inclass.countWords(sample).then(r => {
                    Object.keys(r).forEach(key => {
                        if (!longest) longest = key
                        if (r[key] > r[longest]) {
                            longest = key
                        }
                    })
                })
                .then(done)
            } catch (e) {
                done()
            }
        } else {
            done()
        }
    }

	beforeEach((done) => findLargest(done))

    it('author should be defined', () => {
        expect(inclass.author).to.be.ok
    })

	it('countWords should count the number of words in each article', (done) => {
        inclass.countWords(sample)
        .then(r => {
            expect(Object.keys(r).length).to.equal(15)
            Object.keys(r).forEach(key => {
                expect(r[key]).to.be.above(0)
            })
            done()
        })
        .catch(done)
	})

    it('countWords should pass through errors', (done) => {
        inclass.countWords(`${baseURL}/badURL`)
        .then(r => {
            done(new Error('Received response instead of error ${r}'))
        })
        .catch(e => {
            done()
        })
    })

    it('getLargest should give me the id of the article with the most number of words', (done) => {
        inclass.getLargest(sample)
        .then(r => { expect(r).to.equal(longest); done() })
        .catch(done)
    })

    it('countWordsSafe should catch all errors and return an empty object', (done) => {
        inclass.countWordsSafe(`${baseURL}/badURL`)
        .then(r => { expect(Object.keys(r).length).to.equal(0); done() })
        .catch(done)
    })

})
