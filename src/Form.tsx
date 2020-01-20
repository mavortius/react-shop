import React, { useState } from "react";

export type TValues = {
  [key: string]: any;
}

type Validation = {
  validator: Validator,
  arg?: any
}

type ValidationProp = {
  [key: string]: Validation | Validation[]
}

export type SubmitResult = {
  success: boolean,
  errors?: Errors
}

type FormProps = {
  defaultValues: TValues,
  validationRules: ValidationProp,
  onSubmit: (values: TValues) => Promise<SubmitResult>
}

type Errors = {
  [key: string]: string[]
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
  const errs: Errors = {};
  Object.keys(props.defaultValues).forEach(fieldName => errs[fieldName] = []);

  const [values, setValues] = useState(props.defaultValues);
  const [errors, setErrors] = useState(errs);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setValue = (fieldName: string, value: any) => {
    const newValues = { ...values, [fieldName]: value };
    setErrors(errs);
    setValues(newValues);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);
      const result = await props.onSubmit(values);
      setErrors(result.errors || {});
      setSubmitting(false);
      setSubmitted(result.success);
    }
  };

  const validateForm = (): boolean => {
    const errors: Errors = {};
    let haveError = false;

    Object.keys(props.defaultValues).map(fieldName => {
      errors[fieldName] = validate(fieldName, values[fieldName]);

      if (errors[fieldName].length > 0) {
        haveError = true;
      }
    });
    setErrors(errors);

    return !haveError;
  };

  const validate = (fieldName: string, value: any): string[] => {
    const rules = props.validationRules[fieldName];
    const errs: string[] = [];

    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const err = rule.validator(fieldName, values, rule.arg);
        if (err) {
          errs.push(err);
        }
      })
    } else {
      if (rules) {
        const err = rules.validator(fieldName, values, rules.arg);
        if (err) {
          errs.push(err);
        }
      }
    }

    const newErrors = { ...errors, [fieldName]: errs };

    setErrors(newErrors);

    return errs;
  };

  const context: FormContext = {
    errors,
    values,
    setValue,
    validate
  };

  return (
    <FormContext.Provider value={context}>
      <form className="form" noValidate onSubmit={handleSubmit}>
        {props.children}
        <div className="form-group">
          <button type="submit" disabled={submitting || submitted}>Submit</button>
        </div>
      </form>
    </FormContext.Provider>
  );
};

