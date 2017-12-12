// src/students/StudentsContainer.test.js
import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import StudentsContainer from './StudentsContainer'
import Title from '../components/Title'
import StudentItem from './StudentItem'
import students from '../fixtures/students'

chai.use(chaiEnzyme())

describe('<StudentsContainer />', () => {
  const container = shallow(<StudentsContainer students={students} />)

  it('is wrapped in a div with class name "StudentsContainer"', () => {
    expect(container).to.have.className('StudentsContainer')
  })

  it('contains a Title', () => {
    expect(container).to.have.descendants(Title)
  })

  it('sets the Title to "All Students"', () => {
    expect(container).to.contain(<Title content="All Students" />)
  })

  it('renders all students as a StudentItem', () => {
    expect(container).to.have.exactly(students.length).descendants(StudentItem)
  })
})
