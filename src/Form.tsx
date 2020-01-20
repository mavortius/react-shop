import React, { useState } from "react";

type TValues = {
  [key: string]: any;
}

type FormProps = {
  defaultValues: TValues
}

type FormState = {
  values: TValues
}

type FormContext = {
  values: TValues,
  setValue?: (fieldName: string, value: any) => void
}

type FieldProps = {
  name: string,
  label: string,
  type?: "Text" | "Email" | "Select" | "TextArea",
  options?: string[]
}

export const FormContext = React.createContext<FormContext>({ values: {} });

export const Field: React.FC<FieldProps> = (props) => {
  const { name, label, type, options } = props;

  const handleChange = (e:
                          | React.ChangeEvent<HTMLInputElement>
                          | React.ChangeEvent<HTMLTextAreaElement>
                          | React.ChangeEvent<HTMLSelectElement>,
                        context: FormContext) => {
    if (context.setValue) {
      context.setValue(props.name, e.currentTarget.value);
    }
  };

  return (
    <FormContext.Consumer>
      {context => (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          {(type === "Text" || type === "Email") && (
            <input type={type.toLowerCase()} id={name} value={context.values[name]}
                   onChange={e => handleChange(e, context)}/>
          )}
          {type === "TextArea" && (
            <textarea id={name} value={context.values[name]} onChange={e => handleChange(e, context)}/>
          )}
          {type === "Select" && (
            <select value={context.values[name]} onChange={e => handleChange(e, context)}>
              {options && options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </FormContext.Consumer>
  )
};

Field.defaultProps = {
  type: "Text"
};

export const Form: React.FC<FormProps> = (props) => {
  const [state, setState] = useState<FormState>({ values: props.defaultValues });

  const setValue = (fieldName: string, value: any) => {
    const newValues = { ...state.values, [fieldName]: value };
    setState({ values: newValues });
  };

  const context: FormContext = {
    values: state.values,
    setValue
  };

  return (
    <FormContext.Provider value={context}>
      <form className="form" noValidate>
        {props.children}
      </form>
    </FormContext.Provider>
  );
};

