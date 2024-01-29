import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../../services/operations/settingsApi"
import IconBtn from "../../../common/IconButton"


export default function UpdatePassword() {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {register,reset,  handleSubmit, formState: { errors ,isSubmitSuccessful},} = useForm()
    
  const submitPasswordForm = async (data) => {
    try {
      dispatch(changePassword(token,data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
      })
    }
  },[reset,isSubmitSuccessful])


  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
           
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 xl:flex-row">
          
            <div className="relative flex flex-col gap-2 xl:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style"> Current Password </label>              
              
              <input type={showOldPassword ? "text" : "password"} name="oldPassword"  id="oldPassword"  placeholder="Enter Current Password"  className="form-style"  {...register("oldPassword", { required: true })} />
              
              <span onClick={() => setShowOldPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer" >       
                {showOldPassword ? ( <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> ) : ( <AiOutlineEye fontSize={24} fill="#AFB2BF"/> )}
              </span>
              {errors.oldPassword && (<span className="-mt-1 text-[12px] text-yellow-100"> Please enter your Current Password.</span> )}
            </div>
           
            <div className="relative flex flex-col gap-2   xl:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">  New Password </label>
              <input type={showNewPassword ? "text" : "password"} name="newPassword" id="newPassword" placeholder="Enter New Password" className="form-style" {...register("newPassword", { required: true })}  />
              <span onClick={() => setShowNewPassword((prev) => !prev)}  className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {showNewPassword ? ( <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> ) : ( <AiOutlineEye fontSize={24} fill="#AFB2BF" /> )}
              </span>
              {errors.newPassword && ( <span className="-mt-1 text-[12px] text-yellow-100"> Please enter your New Password.</span> )}
            </div>

            <div className="relative flex flex-col gap-2 xl:w-[48%]">
              <label htmlFor="ConfirmPassword" className="lable-style">Confirm Password </label>

              <input type={showConfirmPassword ? "text" : "password"} name="ConfirmPassword" id="ConfirmPassword" placeholder="Enter Confirm Password" className="form-style" {...register("confirmPassword", { required: true })}  />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}  className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {showConfirmPassword ? ( <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> ) : ( <AiOutlineEye fontSize={24} fill="#AFB2BF" /> )}
              </span>
              {errors.confirmPassword && ( <span className="-mt-1 text-[12px] text-yellow-100"> Please enter your Confirm Password.</span> )}
            </div>
          </div>
       
        </div>

        <div className="flex justify-end gap-2">
          <IconBtn type="submit" text="Update" />
          <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" onClick={() => {navigate("/dashboard/my-profile")}} >
            Cancel
          </button>
        </div>
     
      </form>
    </>
  
)}