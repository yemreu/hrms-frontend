import { useField } from 'formik'
import React from 'react'
import { FormCheckbox, FormField, Label } from 'semantic-ui-react';

export default function HRMSCheckbox({...props}) {
    const [field,meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <FormCheckbox toggle={props.toggle} id={props.id} name={props.name}  label={props.label} placeholder={props.placeholder} onChange={(e)=>props.formikProps.setFieldValue(props.name,field.value)} onBlur={field.onBlur}/>
            {meta.touched && !!meta.error?(<Label pointing basic color="red" content={meta.error}></Label>):null}
        </FormField>
    )
}