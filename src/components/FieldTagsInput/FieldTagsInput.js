import React from 'react'
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

class FieldTagsInput extends React.Component {
  constructor() {
    super()
    this.state = {manufacturer: []}
  }

  handleChange = (manufacturer) => {
    this.setState({manufacturer})
  }

  render() {
    console.log("AAAAAAAAA", this.state.manufacturer)
    return <TagsInput value={this.state.manufacturer} onChange={this.handleChange} addKeys={[13]} inputProps={{
      className: 'react-tagsinput-input',
      placeholder: 'Add new',
    }} />
  }
}

export default FieldTagsInput;