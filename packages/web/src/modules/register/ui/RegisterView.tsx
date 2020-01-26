import * as React from "react";
import { Icon, Button } from "antd";
import { withFormik, FormikProps, FormikErrors, Field } from "formik";
import { validUserSchema } from "@abb/common";
import { InputField } from "../../shared/inputField";

interface FormValues {
  email: string;
  password: string;
}
interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

export class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: " 10em auto" }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />
          <Field
            name="password"
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            component={InputField}
          />
          <div>
            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </div>
          <div>
            Or <a href="#">Login now!</a>
          </div>
        </div>
      </form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  validateOnChange: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
