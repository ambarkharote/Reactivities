import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}


export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    // const handleChange = (_: any, data: { value: string }) => {
    //     helpers.setValue(data.value); 
    // };

    return (
        <Form.Field error={meta.touched && !meta.error}>
            <label>{props.label}</label>
            <Select
                 clearable 
                 options={props.options}
                 value={field.value || null}
                 //onchange = {handleChange}
                 onChange={(_e, d) => helpers.setValue(d.value)}
                 onBlur={() => helpers.setTouched(true)}
                 placeholder={props.placeholder} 
            />
                      
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}