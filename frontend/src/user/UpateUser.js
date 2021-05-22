import { isAuthenticated } from "../auth/helper";
import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { updateUser, getUser } from "./helper/userapicalls";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const UpdateUser = () => {

    const { user, token } = isAuthenticated();
    const backBtn = () => (
        <Link className="" to="/user/dashboard">
            <div className="w-max border border-custom-shade3 rounded-md flex items-center bg-white p-2 hover:bg-custom-shade3 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                <p className="text-xs ml-2 font-semibold">BACK TO DASHBOARD</p>
            </div>
        </Link>
    )

    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });
    const { name, email, password, error, success } = values;
    const preload = () => {
        getUser(user, token)
            .then((data) => {
                // console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, id: data._id, name: data.name, email: data.email })

                }
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        preload();
    }, [])

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        updateUser(values, token)
            .then((data) => {
                // console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({ ...values, success: true })
                }
            })
            .catch(console.log("error in update"));
    };

    const SuccessMessage = () => {
        return (
            <motion.div layout className="max-w-lg mx-auto">
                <div
                    className="bg-custom-shade2 p-2 rounded-md flex justify-between mb-4"
                    style={{ display: success ? "" : "none" }}
                >
                    {console.log(success)}
                    CREDENTIALS UPDATED SUCCESSFULLY
                    <Link to="/user/dashboard">GO TO DASHBOARD</Link>
                </div>
            </motion.div>
        );
    };
    const errorMessage = () => {
        return (
            <motion.div layout className="">
                <div className="">
                    <div
                        className=""
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </motion.div>
        );
    };

    const updateForm = () => {
        return (
            <div className="max-w-lg mx-auto text-custom-shade4 font-custom2">
                <div className="bg-custom-shade2 p-4">
                    {backBtn()}
                </div>
                <div className="bg-white p-4">
                    <div className="border border-custom-shade2 p-4">
                        <div className="mb-4 row">
                            <label className="text-sm font-semibold mr-4 offset-1 col-4 p-2">
                                NAME :
                            </label>
                            <input
                                className="border border-custom-shade3 p-1 outline-none rounded-md"
                                type="text"
                                name=""
                                id=""
                                value={name}
                                onChange={handleChange("name")}
                            />
                        </div>
                        <div className="mb-4 row">
                            <label className="text-sm font-semibold mr-4 offset-1 col-4 p-2">
                                EMAIL : 
                            </label>
                            <input
                                className="border border-custom-shade3 p-1 outline-none rounded-md"
                                type="email"
                                name=""
                                id=""
                                value={email}
                                onChange={handleChange("email")}
                            />
                        </div>
                        <div className="mb-4 row">
                                <label className="text-sm font-semibold mr-4 offset-1 col-4 p-2">
                                    PASSWORD :  
                                </label>
                                <input
                                    className="border border-custom-shade3 p-1 outline-none rounded-md"
                                    type="password"
                                    name=""
                                    id=""
                                    value={password}
                                    onChange={handleChange("password")}
                                />
                        </div>
                        <div className="offset-4">
                            <button onClick={onSubmit} className="btn">
                                SAVE CHANGES
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };




    return (
        <Base title="Update Profile" description="" className="container bg-success">
            {errorMessage()}
            {SuccessMessage()}
            {updateForm()}
        </Base>
    )
}

export default UpdateUser;
