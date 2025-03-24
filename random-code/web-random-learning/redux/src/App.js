import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./actions/index.js";
import { FormikContext, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function App() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { increment, decrement } = bindActionCreators(
        actionCreators,
        dispatch
    );
    const [dir, setDir] = useState(1);
    const formik = useFormik({
        initialValues: {
            change: "",
        },
        validationSchema: Yup.object({
            change: Yup.number()
                .max(100000, "Too big!")
                .min(0, "Must be positive")
                .required("Required"),
        }),
        onSubmit: () => {
            dir > 0
                ? increment(parseInt(formik.values.change))
                : decrement(parseInt(formik.values.change));
        },
    });

    console.log(formik.errors);
    return (
        <div className="App">
            <h1>Simple Counter Application</h1>
            <p>Made with JS, React-Redux and Formik</p>
            <br></br>
            <input
                id="change"
                name="change"
                type="text"
                placeholder="Value"
                onChange={formik.handleChange}
                value={formik.values.change}
                onBlur={formik.handleBlur}
                style={{ textAlign: "center" }}
            />
            {formik.touched.change && formik.errors.change ? (
                <p style={{ color: "red" }}>{formik.errors.change}</p>
            ) : (
                <p>✓</p>
            )}
            <p>Count: {state.count}</p>
            <form onSubmit={formik.handleSubmit}>
                <button
                    onClick={() => {
                        setDir(1);
                    }}
                    type="submit"
                >
                    Increment
                </button>
                <button
                    onClick={() => {
                        setDir(-1);
                    }}
                    type="submit"
                >
                    Decrement
                </button>
            </form>
        </div>
    );
}

export default App;
