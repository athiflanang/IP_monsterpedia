import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { GoogleLogin } from "@react-oauth/google";

export default function Login({ url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/login`, {
        username,
        email,
        password,
      });
      localStorage.setItem("access_token", data.access_token);
      Toastify({
        text: "Success Login",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      navigate("/");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(
        `${url}/google-login`,
        {},
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  function usernameOnChange(event) {
    setUsername(event.target.value);
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Login Page
          </h1>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="username"
                placeholder="Username"
                className="w-full input input-bordered"
                onChange={usernameOnChange}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full input input-bordered"
                onChange={emailOnChange}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered"
                onChange={passwordOnChange}
                required
              />
            </div>
            <div>
              <button onClick={login} className="btn-neutral btn btn-block">
                Login
              </button>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
