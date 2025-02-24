import React, {useState} from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({value,placeholder,onChange,autoComplete}) => {

    const [isShowPassWord, setIsShowPassword] = useState(false);

    const toggleShowPassWord = () => {
        setIsShowPassword(!isShowPassWord);
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5  border-gray-300 rounded mb-3'>
        <input
         value={value}
         onChange={onChange}
         type={isShowPassWord ? "text" : "password"}
         placeholder={placeholder || "Password"}
         className="w-full text-sm  bg-transparent py-3 mr-3 rounded outline-none "
         autoComplete={autoComplete}
        />
        {isShowPassWord ? <FaRegEye
        size={22}
        className="text-primary cursor-pointer"
        onClick={() => toggleShowPassWord()}
        /> :<FaRegEyeSlash
        size={22}
        className="text-slate-400 cursor-pointer"
        onClick={() => toggleShowPassWord()}
        /> }
    </div>
  )
}

export default PasswordInput