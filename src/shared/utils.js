import React, { forwardRef } from 'react';

export const objectMap = (obj, f) =>
  Object.keys(obj).reduce(
    (prev, key) => ({ ...prev, [key]: f(obj[key], key) }),
    {}
  );

export const getInputAndRefresh = (refs, callback) => {
  callback(objectMap(refs, ref => ref.current.value), () => {
    objectMap(refs, ref => (ref.current.value = '')); // Refresh input fields
  });
};

export const withPropsAndForwardedRef = props => BaseComponent =>
  forwardRef((ownerProps, ref) => (
    <BaseComponent forwardedRef={ref} {...ownerProps} {...props} />
  ));
