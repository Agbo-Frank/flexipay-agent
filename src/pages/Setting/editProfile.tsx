import { TitlePage, Wrapper } from "../../components/StyleComponents";
import profilePics from '../../asset/profilepics.png'
import { CameraIcon, MailIcon, PhoneIcon, UserIcon } from "../../components/icons";
import { FormInput, DateInput, SelectInput } from "../../components/material"
import { FPFormikEditUser } from "./service";

import NaijaStates from 'naija-state-local-government';
import React, { useEffect, useState } from "react";
import { useEditUserMutation, useGetUserQuery } from "../../redux/api";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function EditProfile(){
    let navigate = useNavigate()
    let [image, setImage] = useState<any>(profilePics)
    const { user } = useGetUserQuery(undefined, {
        selectFromResult: ({data}) => ({
            user: data?.result.data
        })
    })
    console.log(user)

    const [editUser, { isLoading }] = useEditUserMutation()

    const formik = FPFormikEditUser(user, editUser)

    let [states, setStates] = useState()
    let [lgas, setLgas] = useState()

    useEffect(() => {
        let states = NaijaStates.states()
        
        states = states.map((state: string) => ({label: state, value: state}))
        setStates(states)
    }, [])

    function onChangeState(state: string){
        
        let lgas = NaijaStates.lgas(state)
    
        lgas = lgas.lgas.map((lga: string) => ({label: lga, value: lga}))
        setLgas(lgas)
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement> | any){
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImage(reader.result)
        }
    }
    return(
        <div className="w-full">
            <TitlePage>Edit Profile Details</TitlePage>
            <form onSubmit={formik.handleSubmit}>
            <Wrapper styles="w-full md:grid place-items-center my-2 py-8">
                <div className="w-full py-8 border border-[#C6C6CA] rounded-lg lg:w-[800px] md:flex flex-col items-center md:space-y-6">
                    {/* <div className="">
                        <img src={image} alt="profile pics" className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] mx-auto rounded-full object-cover" />
                        <div className="flex items-center justify-center space-x-2 my-5">
                            <CameraIcon size="18" color="#1900FE" />
                            <label 
                                className="text-primary-blue text-sm"
                                htmlFor="profile">
                                    Change cover photo
                                    <input  
                                        type="file" 
                                        className="hidden" 
                                        id="profile"
                                        onChange={onChange}/>
                            </label>
                        </div>
                    </div> */}
                    <div className="w-10/12 mx-auto space-y-1">
                        <div className="md:flex justify-between md:space-x-4">
                            <div className="w-full">
                                <span className="m-1 block">First Name</span>
                                <FormInput
                                    type="text"
                                    name="first_name"
                                    Icon={UserIcon}
                                    label={user?.first_name || "First Name"}
                                    formik={formik} />
                            </div>

                            <div className="w-full">
                                <span className="m-1 block">Last Name</span>
                                <FormInput
                                    type="text"
                                    name="last_name"
                                    Icon={UserIcon}
                                    label={user?.last_name || "Last Name"}
                                    formik={formik} />
                            </div>
                        </div>

                        <div className="md:flex justify-between md:space-x-4">
                            <div className="w-full">
                                <span className="m-1 block">Email</span>
                                <FormInput
                                type="email"
                                name="email"
                                Icon={MailIcon}
                                label={user?.email || "Email"}
                                formik={formik} />
                            </div>

                            <div className="w-full">
                                <span className="m-1 block">Phone Number</span>
                                <FormInput
                                    type="text"
                                    name="phone_number"
                                    Icon={PhoneIcon}
                                    label={user?.phone_number || "Phone Number"}
                                    formik={formik} />
                            </div>
                        </div>
                        <div className="md:flex justify-between md:space-x-4">
                            <div className="w-full">
                                <span className="m-1 block">Gender</span>
                                <SelectInput 
                                    label="Gender" 
                                    name="gender" 
                                    data={[{label: 'Male', value: 'Male'},{label: 'Female', value: 'Female'}]}
                                    formik={formik}
                                />
                            </div>

                            <div className="w-full">
                                <span className="m-1 block">Date of Birth</span>
                                <DateInput
                                    label="Date of Birth" 
                                    name="dob"
                                    formik={formik}
                                />
                            </div>
                        </div>
                        <div className="md:flex justify-between md:space-x-4">
                            <div className="w-full">
                                <span className="m-1 block">State</span>
                                <SelectInput 
                                    label="State" 
                                    name="state" 
                                    data={states}
                                    onChange={(state) => onChangeState(`${state}`)}
                                    formik={formik}
                                />
                            </div>

                            <div className="w-full">
                                <span className="m-1 block">LGA</span>
                                <SelectInput 
                                    label="LGA" 
                                    name="city" 
                                    data={lgas}
                                    formik={formik}
                                />
                            </div>
                        </div>
                        <div className="md:flex justify-between md:space-x-4">
                            <div className="w-full">
                                <span className="m-1 block">Address</span>
                                <FormInput 
                                    type="text"
                                    name="house_address"
                                    Icon={UserIcon}
                                    label={user?.address || "Address"}
                                    formik={formik}
                                />
                            </div>

                            <div className="w-full">
                                <span className="m-1 block">Nearest Bus Stop</span>
                                <FormInput 
                                    type="text"
                                    name="nearest_bus_stop"
                                    Icon={UserIcon}
                                    label={user?.nearest_bus_stop || "Nearest Bus Stop"}
                                    formik={formik}
                                />
                            </div>
                        </div>
                        <div className="md:flex justify-between md:space-x-4">
                            <div className="md:w-1/2">
                                <span className="m-1 block">Postal Code</span>
                                <FormInput 
                                    type="text"
                                    name="postal_code"
                                    Icon={UserIcon}
                                    label={user?.postal_code || "Postal Code"}
                                    formik={formik}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <div className="my-8 md:flex justify-between items-center">
                <button 
                type="button" 
                className="group border border-[#E1E1E1] rounded-lg py-2 hover:opacity-50 my-3 md:my-auto w-full md:w-[200px] space-x-2 bg-transparent flex justify-center items-center"
                onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left text-[#545362] group-hover:mr-2"></i>
                    <span className="font-light">Go Back</span>
                </button>
                <div className="flex space-x-3 w-full md:w-4/12 ">
                    <Button variant="outlined" 
                        sx={{width: '50%'}}
                        onClick={() => navigate(-1)}>Cancel</Button>
                    <LoadingButton 
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                        disableElevation
                        size="large"
                        sx={{width: '50%'}}>Continue</LoadingButton>
                </div>
            </div>
            </form>
        </div>
    )
}

export default EditProfile