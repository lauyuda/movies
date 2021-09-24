import { Button } from "components/button";
import { TextField } from "components/text-field";
import * as React from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/use-register";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Name is required"),
  email: Yup.string().email('Invalid email').required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long."),
  avatar: Yup.string().required("Avatar is required"),
});

export const RegisterForm = () => {
  const fullnameInputRef = React.useRef();
  const [status, setStatus] = React.useState("idle");
  const register = useRegister();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      avatar: "",
    },
    validationSchema,
    onSubmit: (values) => {
      register(
        {
          ...values,
        },
      ).then(
        () => {
          formik.resetForm();

          if (fullnameInputRef.current) {
            fullnameInputRef.current.focus();
          }

          setStatus("registered")
        }
      ).catch(
        () => {
          setStatus("error")
        }
      );
    },
  });

  return (
    <div className="max-w-md mx-auto m-6 shadow">
      <form onSubmit={formik.handleSubmit}
        className="p-6"
      >
        {status === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            Fail to register.
          </div>
        )}
        {status === "registered" && (
          <div className="p-2 text-green-800 bg-green-200 rounded-sm">
            Successfully registered. Click&nbsp;
            <Link to="/login">
              <span className="font-bold">here</span>
            </Link> to login.
          </div>
        )}
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Register
        </div>

        <div className="space-y-6">
          <div>
            <TextField
              label="Fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="fullname"
              id="fullname"
              autoFocus
              required
              disabled={status === "loading"}
              ref={fullnameInputRef}
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <div className="block text-xs text-red-500">
                {formik.errors.fullname}
              </div>
            )}
          </div>
          <div>
            <TextField
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
              required
              disabled={status === "loading"}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="block text-xs text-red-500">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <TextField
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              id="password"
              type="password"
              required
              disabled={status === "loading"}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="block text-xs text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div>
            <TextField
              label="Avatar"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="avatar"
              id="avatar"
              required
              disabled={status === "loading"}
            />
            {formik.touched.avatar && formik.errors.avatar && (
              <div className="block text-xs text-red-500">
                {formik.errors.avatar}
              </div>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            Register
          </Button>
        </div>
      </form >
    </div >
  );
};
