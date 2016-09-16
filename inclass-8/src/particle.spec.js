import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle()
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
    })

    it('should update the position by the velocity', () => {
        const p = particle()
        const canvas = {'width': 800, 'height':800}
        p.position = [1, 1]
        p.velocity = [0.5, -0.5]
        const { position } = update(p, 1.0, canvas)
        expect(position[0]).to.equal(1.5)
        expect(position[1]).to.equal(0.5)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle()
        const canvas = {'width': 800, 'height':800}
        p.position = [1, 1]
        p.velocity = [0.5, -0.5]
        const { position } = update(p, 2.0, canvas)
        expect(position[0]).to.equal(2.0)
        expect(position[1]).to.equal(0.0)        
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle()
        const canvas = {'width': 800, 'height':800}
        p.velocity = [1, 1]
        p.acceleration = [1, -1]
        const { velocity } = update(p, 1.0, canvas)
        expect(velocity[0]).to.equal(2.0)
        expect(velocity[1]).to.equal(0.0)  
    })

    it('particles should wrap around the world', () => {
        const p1 = particle()
        const canvas = {'width': 800, 'height':800}
        p1.position = [1000, 1000]
        var { position } = update(p1, 1.0, canvas)
        expect(position[0]).to.be.within(0, 800)
        expect(position[1]).to.be.within(0, 800)

        const p2 = particle({ position: [-200, -50] })
        var { position } = update(p2, 1.0, canvas)
        expect(position[0]).to.be.within(0, 800)
        expect(position[1]).to.be.within(0, 800)
    })

})
