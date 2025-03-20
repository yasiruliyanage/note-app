import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstanxe";

const SignUp = () => {
  const [ email, setEmail] = useState("");
  const [ name, setName] = useState("");
  const [ password, setPassword] = useState("");
  const [ error , setError] = useState("");
  
  const navigate = useNavigate();

  const handleSignup =  async (e) => {
     e.preventDefault();
     setError("");
     if(!name) {
      setError("Please Enter your name");
      return;
     }

     if(!validateEmail(email)) {
      setError("Please enater a valud email address.");
      return;
     }

     if(!password) {
      setError("Please enter a password");
      return;
     }
     setError("");

     //signUp API Call

     try {
      const response = await axiosInstance.post("/create-account",{
        fullName: name,
        email: email,
        password: password
      });

     //Handle Successful Signup response
     if(response.data && response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken)
      navigate('/dashboard');
     }
    } catch (error) {
      //Handle Signup Error
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please Try again.");
      }
    }
  };
  return (
   <>
     <Navbar/>
   <div className="flex items-center justify-center mt-28 ">
    <div className='w-96 border rounded bg-white border-gray-300 px-7 py-10'>
          <form onSubmit={handleSignup}>
                 <h4 className="text-2xl mb-7"> SignUp </h4>
                 <input
                 type="text"
                 placeholder='Name'
                 className='input-box'
                 autoComplete='true'
                 value={name}
                 onChange={(e)=> setName(e.target.value)}
                 />
                 <input
                 type="text" 
                 placeholder='Email' 
                 className='input-box' 
                 autoComplete='true'
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                 />
                <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={"true"}
                />
                <button type="submit" className="btn-primary"> Create Account </button>
                  { error && <p className="text-red-500 text-xs pb-1"> {error}</p> }

                  <p className="text-sm text-center mt-4">
                    Already have an account? {""}
                    <Link to="/login" className="font-medium text-primary underline">
                    Login
                    </Link>
                  </p>
          </form>
                 </div>
                 </div>
          
   </>
  )
}

export default SignUp