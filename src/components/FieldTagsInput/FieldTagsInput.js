import React from 'react';
import TagsInput from 'react-tagsinput';
import { Field } from 'react-final-form';
import 'react-tagsinput/react-tagsinput.css';

const FieldTagsInput = props => {
  const { tagArray, handleChange, placeholder, ...rest } = props;
  {
    const tag = () => (
      <TagsInput
        value={tagArray}
        onChange={handleChange}
        addKeys={[13]}
        inputProps={{
          className: 'react-tagsinput-input',
          placeholder: placeholder,
          id: rest.id,
          name: rest.name,
        }}
      />
    );

    return <Field component={tag} {...rest} />;
  }
};

export default FieldTagsInput;
