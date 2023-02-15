import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import logo from "../assets/logo.png";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import Loader from "./Loader";
import PopupDialog from "./Dialog";
import Cookies from 'js-cookie'
import "./Formik.css"
const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 charecters are required!")
    .max(50, "Maximum 50 charecters are allowed!")
    .required("Name is required"),
  aadharNumber: Yup.string()
    .max(14, "Maximum 14 digits are allowed!")
    .min(14, "Maximum 14 digits are allowed!")
    .required("Aadhar number is required"),
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
  // profileImg: Yup.mixed().required("Profile image is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  landmark: Yup.string().required("Address Line 2 is required"),
  area: Yup.string().required("Area is required"),
  city: Yup.string().required("City is required"),
  ward: Yup.string().required("Ward is required"),
});

const Dropdown = ({ options, field, form }) => {
  return (
    <select
      {...field}
      name="sex"
      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Formiks = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [images, setImages] = useState();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("tokenShine2023");
  const decoded = jwt_decode(token);
  

  const initialValues = {
    name: "",
    aadharNumber: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    address: "",
    landmark: "",
    area: "",
    city: "Junagadh",
    ward: "",
  };


  // const handleChange = (e) =>
  // {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };
  const handleSubmit = async (
    values,
    setSubmitting,
    resetForm,
    setServerError
  ) => {
    setLoading(true);
    const aadharNumber = values.aadharNumber.replace(/\s/g, "");
    try {
      const formData = new FormData();
      formData.append("image", images);
      formData.append("name", values.name);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("gender", values.gender);
      formData.append("aadharNumber", aadharNumber);
      formData.append("dob", values.dob);
      formData.append("address", values.address);
      formData.append("landmark", values.landmark);
      formData.append("area", values.area);
      formData.append("city", values.city);
      formData.append("ward", values.ward);
      formData.append("userId", decoded.id);


      const res = await axios.post(
        "https://backend-form.onrender.com/api/v1/submitform",
        formData
      );
      setLoading(false);
      setIsPopupOpen(true);
      setServerError(res.data.message);
      setImages()
      resetForm();
    } catch (error) {
      setLoading(false);
      setIsPopupOpen(true);
      setServerError(error.response.data.message);
    } finally {
      setLoading(false);

      // Set the submitting status to false
      setSubmitting(false);
    }
  };

  const handleCoverImage = async (acceptedFiles) => {
    setImages(acceptedFiles[0]);
  };

  const handleKeyDown = (e) => {
    e.preventDefault(); // prevent typing
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 60);
  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md mx-auto px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              handleSubmit(values, setSubmitting, resetForm, setServerError);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4">
                <div className="flex items-center justify-center">
                  <img
                    src={logo}
                    alt="logo"
                    style={{ height: "120px", width: "120px" }}
                  />

                  <h2 className="text-center text-xl mt-6 text-gray-900">
                    Sr. Citizen Primary Health Card Form
                  </h2>
                </div>

                <div className="mt-8 md:mt gap-6 mb-6 md:grid sm:grid">
                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 mt-5"
                    >
                      Name
                    </label>
                    <Field
                      maxLength={50}
                      type="text"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <label
                      for="aadhar"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Aadhar Number
                    </label>
                    <Field
                      type="text"
                      name="aadharNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0000 0000 0000"
                      maxLength={14}
                      onKeyPress={(e) => {
                        const currentValue = e.target.value;

                        if (
                          /\d/.test(e.key) &&
                          currentValue.replace(/\s/g, "").length < 12
                        ) {
                          setTimeout(() => {
                            const updatedValue = e.target.value;

                            const formattedValue = updatedValue
                              .replace(/\s/g, "")
                              .replace(/(\d{4})/g, "$1 ")
                              .trim();

                            e.target.value = formattedValue;
                          }, 10);
                        } else {
                          e.preventDefault();
                        }
                      }}
                    />
                    <ErrorMessage
                      name="aadharNumber"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="mobile"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Mobile Number
                    </label>
                    <Field
                      onKeyPress={(e) => {
                        if (e.target.value.length >= 10) {
                          e.preventDefault();
                        }
                      }}
                      type="number"
                      name="mobileNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mobile Number"
                    />
                    <ErrorMessage
                      name="mobileNumber"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <label
                      for="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 1
                    </label>
                    <Field
                      maxLength={100}
                      type="text"
                      name="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Address Line 1"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 2
                    </label>
                    <Field
                      maxLength={100}
                      type="text"
                      name="landmark"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Address Line 2"
                    />
                    <ErrorMessage
                      name="landmark"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Gender
                    </label>
                    <div role="group" aria-labelledby="gender">
                      <label>
                        <Field type="radio" name="gender" value="Male" />
                        {" Male"}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value="Female"
                          className="ml-4"
                        />
                        {" Female"}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value="Others"
                          className="ml-4"
                        />
                        {" Others"}
                      </label>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Date of Birth
                    </label>
                    <Field
                      // onChange={handleChange}
                      type="date"
                      name="dob"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Date of Birth"
                      max={maxDate.toISOString().split("T")[0]}
                      onKeyDown={handleKeyDown}
                    />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Area
                    </label>
                    <Field
                      maxLength={100}
                      type="text"
                      name="area"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Area"
                    />
                    <ErrorMessage
                      name="area"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <Field
                      name="city"
                      component={Dropdown}
                      options={[
                        { value: "Junagadh", label: "Junagadh" },
                      ]}
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Ward
                    </label>
                    <Field
                      type="number"
                      name="ward"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ward"
                      onKeyPress={(e) => {
                        if (e.target.value.length >= 2) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <ErrorMessage
                      name="ward"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      className="mb-2 text-sm font-medium text-gray-900 flex"
                    >
                      Profile Picture
                    </label>
                    <Dropzone
                      onDrop={handleCoverImage}
                      multiple={false}
                      maxSize={800000000}
                      accept=".jpeg,.jpg,.png,.gif"
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="width-full">
                          {images ? (
                            <div className="bg-gray-circle flex items-center justify-center cover_iimg mt-8">
                              <img
                                alt="person"
                                src={URL.createObjectURL(images)}
                                className="cover_iimg"
                              />
                              <input {...getInputProps()} />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <input {...getInputProps()} />
                                Choose Your Profile Picture
                                {/* <svg
                                  class="svg-icon"
                                  style={{ width: "60px" }}
                                  viewBox="0 0 1024 1024"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M512 597.994667q108.010667 0 225.002667 46.997333t116.992 123.008l0 85.994667-684.010667 0 0-85.994667q0-76.010667 116.992-123.008t225.002667-46.997333zM512 512q-69.994667 0-120-50.005333t-50.005333-120 50.005333-121.002667 120-51.008 120 51.008 50.005333 121.002667-50.005333 120-120 50.005333z" />
                                </svg> */}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"

                    // onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? <Loader /> : "Submit"}
                  </button>
                </div>
                <PopupDialog
                  isOpen={isPopupOpen}
                  message={serverError}
                  onClose={() => setIsPopupOpen(false)}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Formiks;
