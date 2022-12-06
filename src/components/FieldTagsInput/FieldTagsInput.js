import React, { useEffect, useRef } from 'react';
import TagsInput from 'react-tagsinput';
import { Field } from 'react-final-form';
// import 'react-tagsinput/react-tagsinput.css';
import './style.css';

const FieldTagsInput = props => {
  const { tagArray, handleChange, placeholder, ...rest } = props;
  const ref = useRef();
  useEffect(() => {
    ref.current.input.focus()
    
    return () => {
      // second
    };
  });

  {
    const tag = () => (
      <TagsInput
      
        value={tagArray}
        onChange={handleChange}
        ref={ref}
        addKeys={[13]}
        onlyUnique
        inputProps={{
          className: 'react-tagsinput-input',
          placeholder: placeholder,
          id: rest.id,
          name: rest.name
        }}
      />
    );

    return <Field component={tag} {...rest} />;
  }
};

export default FieldTagsInput;
