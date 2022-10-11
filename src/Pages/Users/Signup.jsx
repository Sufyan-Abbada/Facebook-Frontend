import React, { useContext } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserContext } from "../../Helpers/UserContext"

const initialValues = {
  name: "Sufyan Abbada",
  email: "sufyan@gmail.com",
  password: "test1234",
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(5, "Name should be more than 3 characters")
    .max(25, "Name should not exceed more than 25 characters"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string()
    .min(5, "Password should be more than 5 characters")
    .max(25, "Password should not exceed more than 25 characters")
    .required("Password is Required")
    .matches("^[a-zA-Z0-9]*$", "Password should be Alphanumeric"),
})

const SignUp = () => {
  const { users, setUsers } = useContext(UserContext)
  const navigate = useNavigate()
  const notify = (message) => toast(message)

  const onSubmit = (values) => {
    if (users) {
      for (const user of users) {
        if (user.email === values.email) {
          notify("User already exists")
          return
        }
      }
    }
    setUsers([...users, { id: users.length + 1, ...values }])
    notify("You have successfully Signed Up")
    navigate("/login")
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
    <div className="midForm">
      <h2>Registration Page</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label for="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error form-text text-muted">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
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
        Already have an Account. <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  )
}

export default SignUp
