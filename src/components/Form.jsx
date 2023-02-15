import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
const Form = () => {
  const [images, setImages] = useState();
  const [data, setData] = useState({
    name: "",
    aadharNumber: "",
    mobileNumber: "",
    gender: "Male",
    dob: "",
    address: "",
    landmark: "",
    area: "",
    city: "",
    ward: "",
  });


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("image", images);
  formData.append("name", data.name);
  formData.append("mobileNumber", data.mobileNumber);
  formData.append("gender", data.gender);
  formData.append("aadharNumber", data.aadharNumber);
  formData.append("dob", data.dob);
  formData.append("address", data.address);
  formData.append("landmark", data.landmark);
  formData.append("area", data.area);
  formData.append("city", data.city);
  formData.append("ward", data.ward);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/v1/submitform", formData);
  };

  const handleCoverImage = async (acceptedFiles) => {
    setImages(acceptedFiles[0]);
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4 ">
          <h2 className="text-center text-3xl font-bold mt-6 text-gray-900">
            Please fill your Details
          </h2>
          <div>
            {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
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
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                        }}
                      />
                      <input {...getInputProps()} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center mt-8">
                      <div
                        className="bg-gray-circle flex items-center justify-center"
                        style={{
                          backgroundColor: "#d1d5db",
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                        }}
                      >
                        <svg
                          class="svg-icon"
                          style={{ width: "60px" }}
                          // style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 597.994667q108.010667 0 225.002667 46.997333t116.992 123.008l0 85.994667-684.010667 0 0-85.994667q0-76.010667 116.992-123.008t225.002667-46.997333zM512 512q-69.994667 0-120-50.005333t-50.005333-120 50.005333-121.002667 120-51.008 120 51.008 50.005333 121.002667-50.005333 120-120 50.005333z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div className="mt-8 md:mt grid grid-cols-2 gap-6 mb-6 md:grid sm:grid">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>

            <div>
              <label
                for="aadhar"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Aadhar Number
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="aadharNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                maxLength={12}
              />
            </div>
            <div>
              <label
                for="mobile"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="mobileNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                minLength={10}
                maxLength={10}
                pattern="[0-9]*"
              />
            </div>

            <div>
              <label
                for="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                landmark
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="landmark"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                onChange={handleChange}
                // type="date"
                name="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                onChange={handleChange}
                type="date"
                name="dob"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Area
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="area"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                city
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ward
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="ward"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // type="submit"

              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
