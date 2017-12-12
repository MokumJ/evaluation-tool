// src/students/StudentItem.test.js
import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import StudentItem from './StudentItem'
import Title from '../components/Title'

chai.use(chaiEnzyme())

const student = {
    title: 'Spanish Omelette',
    summary: 'A traditional dish from Spanish cuisine called tortilla española or tortilla de patatas. It is an omelette made with eggs and potatoes, sometimes also with onion and/or chives or garlic; fried in oil and often served cold as an appetizer.',
    vegan: false,
    vegetarian: true,
    pescatarian: false,
}

describe('<StudentItem />', () => {
  const container = shallow(<StudentItem { ...student } />)

  it('is wrapped in a article tag with class name "StudentItem"', () => {
    expect(container).to.have.tagName('article')
    expect(container).to.have.className('StudentItem')
  })

  it('contains a title', () => {
    expect(container).to.contain(<Title content={student.title} className="level-2" />)
  })
})
