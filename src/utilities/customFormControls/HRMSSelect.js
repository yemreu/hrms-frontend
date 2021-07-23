import { useField } from 'formik'
import React from 'react'
import { FormField, FormSelect, Label } from 'semantic-ui-react';

export default function HRMSSelect({...props}) {
    const [field,meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <FormSelect  fluid={props.fluid} id={props.id} name={props.name}  label={props.label} placeholder={props.placeholder} options={props.options} onChange={(e,item)=>props.formikProps.setFieldValue(props.name,item.value)} onBlur={field.onBlur} />
            {meta.touched && !!meta.error?(<Label pointing basic color="red" content={meta.error}></Label>):null}
        </FormField>
    )
}