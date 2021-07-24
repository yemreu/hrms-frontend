import { useField } from 'formik'
import React from 'react'
import { FormField, FormInput, Label } from 'semantic-ui-react';

export default function HRMSFileInput({...props}) {
    const [field,meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <FormInput  type="file" id={props.id} name={props.name} onChange={(e)=>props.formikProps.setFieldValue(props.name,e.currentTarget.files[0])} onBlur={field.onBlur}/>
            {meta.touched && !!meta.error?(<Label pointing basic color="red" content={meta.error}></Label>):null}
        </FormField>
    )
}