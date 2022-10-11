import React, { useContext } from "react"
import * as Yup from "yup"
import { useEffect } from "react"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../Helpers/UserContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const initialValues = {
  email: "sufyan@gmail.com",
  password: "test1234",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string()
    .min(5, "Password should be more than 5 characters")
    .max(25, "Password should not exceed more than 25 characters")
    .required("Password is Required")
    .matches("^[a-zA-Z0-9]*$", "Password should be Alphanumeric"),
})

const Login = () => {
  const { loggedInUser, setLoggedInUser, users } = useContext(UserContext)
  const navigate = useNavigate()
  const notify = (message) => toast(message)

  useEffect(() => {
    if (loggedInUser) {
      navigate("/")
    }
  }, [])

  const onSubmit = (values) => {
    if (users) {
      for (const user of users) {
        if (user.email === values.email && user.password === values.password) {
          notify("You have successfully Logged In")
          setLoggedInUser({ id: user.id, presence: true, name: user.name })
          navigate("/posts")
          return
        }
      }
      notify("Invalid Credentials")
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
    <div className="midForm">
      <h2>Login Page</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="formInput">
          <label>
            Email:{" "}
            <input
              type="text"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="formInput">
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <input type="submit" value="Submit" />
      </form>
      <p>
        Don't have an Account. Let's get you{" "}
        <Link to="/signup">Registered</Link>
      </p>
    </div>
  )
}

export default Login
