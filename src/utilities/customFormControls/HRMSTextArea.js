import { useField } from 'formik'
import React from 'react'
import { FormField, FormTextArea, Label } from 'semantic-ui-react';

export default function HRMSTextArea({...props}) {
    const [field,meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <FormTextArea {...props} {...field}/>
            {meta.touched && !!meta.error?(<Label pointing basic color="red" content={meta.error}></Label>):null}
        </FormField>
    )
}