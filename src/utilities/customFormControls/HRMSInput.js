import { useField } from 'formik'
import React from 'react'
import { FormField, FormInput, Label } from 'semantic-ui-react';

export default function HRMSInput({...props}) {
    const [field,meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <FormInput {...props} {...field}/>
            {meta.touched && !!meta.error?(<Label pointing basic color="red" content={meta.error}></Label>):null}
        </FormField>
    )
}
