import React, { useState } from "react";

type TValues = {
  [key: string]: any;
}

type Validation = {
  validator: Validator,
  arg?: any
}

type ValidationProp = {
  [key: string]: Validation | Validation[]
}

type FormProps = {
  defaultValues: TValues,
  validationRules: ValidationProp
}

type Errors = {
  [key: string]: string[]
}

type FormState = {
  values: TValues,
  errors: Errors
}

type FormContext = {
  errors: Errors,
  values: TValues,
  setValue?: (fieldName: string, value: any) => void,
  validate?: (fieldName: string, value: any) => void
}

type FieldProps = {
  name: string,
  label: string,
  type?: "Text" | "Email" | "Select" | "TextArea",
  options?: string[]
}

export type Validator = (
  fieldName: string,
  values: TValues,
  args?: any
) => string;

export const required: Validator = (fieldName: string, values: TValues): string =>
  values[fieldName] === undefined || values[fieldName] === null || values[fieldName] === ""
    ? "This must be populated" : "";

export const minLength: Validator = (fieldName: string, values: TValues, length: number): string =>
  values[fieldName] && values[fieldName].length < length
    ? `This must be at least ${length} characters` : "";

export const email: Validator = (fieldName: string, values: TValues): string =>
  values[fieldName] && !validateEmail(values[fieldName])
    ? "This must be a valid email" : "";

function validateEmail(email: string): boolean {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

export const FormContext = React.createContext<FormContext>({ errors: {}, values: {} });

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

  const handleBlur = (e:
                        | React.FocusEvent<HTMLInputElement>
                        | React.FocusEvent<HTMLTextAreaElement>
                        | React.FocusEvent<HTMLSelectElement>,
                      context: FormContext) => {
    if (context.validate) {
      context.validate(props.name, e.currentTarget.value);
    }
  };

  return (
    <FormContext.Consumer>
      {context => (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          {(type === "Text" || type === "Email") && (
            <input type={type.toLowerCase()} id={name} value={context.values[name]}
                   onChange={e => handleChange(e, context)} onBlur={e => handleBlur(e, context)}/>
          )}
          {type === "TextArea" && (
            <textarea id={name} value={context.values[name]}
                      onChange={e => handleChange(e, context)} onBlur={e => handleBlur(e, context)}/>
          )}
          {type === "Select" && (
            <select value={context.values[name]}
                    onChange={e => handleChange(e, context)} onBlur={e => handleBlur(e, context)}>
              {options && options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {context.errors[name] && context.errors[name].length > 0 && context.errors[name].map(err => (
            <span key={err} className="form-error">{err}</span>
          ))}
        </div>
      )}
    </FormContext.Consumer>
  )
};

Field.defaultProps = {
  type: "Text"
};

export const Form: React.FC<FormProps> = (props) => {
  const errors: Errors = {};
  Object.keys(props.defaultValues).forEach(fieldName => errors[fieldName] = []);
  const [state, setState] = useState<FormState>({ values: props.defaultValues, errors });

  const setValue = (fieldName: string, value: any) => {
    const newValues = { ...state.values, [fieldName]: value };
    setState({ errors, values: newValues });
  };

  const validate = (fieldName: string, value: any): string[] => {
    const rules = props.validationRules[fieldName];
    const errs: string[] = [];

    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const err = rule.validator(fieldName, state.values, rule.arg);
        if (err) {
          errs.push(err);
        }
      })
    } else {
      if (rules) {
        const err = rules.validator(fieldName, state.values, rules.arg);
        if (err) {
          errs.push(err);
        }
      }
    }

    const newErrors = { ...state.errors, [fieldName]: errs };

    setState({ values: state.values, errors: newErrors });

    return errs;
  };

  const context: FormContext = {
    errors: state.errors,
    values: state.values,
    setValue,
    validate
  };

  return (
    <FormContext.Provider value={context}>
      <form className="form" noValidate>
        {props.children}
      </form>
    </FormContext.Provider>
  );
};

