import React from "react";

const Form = ({ onSubmit, children, ...form }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(evt);
  };

  return (
    <form onSubmit={handleSubmit} {...form}>
      {children}
    </form>
  );
};

export default Form;
