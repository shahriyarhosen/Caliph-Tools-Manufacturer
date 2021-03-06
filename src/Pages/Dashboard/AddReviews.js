import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.inite";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const AddReviews = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading></Loading>;
  }

  // current date
  const today = new Date();
  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  // ==================

  const onSubmit = (data) => {
    const retting = Number(data.retting);
    const name = user?.displayName;
    const img = user?.photoURL;

    const review = {
      name: name,
      img: img,
      retting: retting,
      description: data.reviewText,
      date,
    };

    axios
      .post("https://glacial-falls-86656.herokuapp.com/reviews", review, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        if (res.status === 200) {
          toast.success("Your review add successful. Thanks");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        toast.error(error.massage);
      });
  };
  return (
    <div>
      <h1 className="text-4xl font-bold pb-10 bg-yellow-50 text-center text-primary pt-5">
        Add A Reviews
      </h1>
      <div className="hero pb-10 bg-yellow-50">
        <div className="card flex-shrink-0 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <span className="text-center text-md font-bold text-secondary font-mono">
              Date: {date}
            </span>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Retting</span>
              </label>
              <input
                type="number"
                min="1"
                max="5"
                name="retting"
                placeholder="Retting"
                className="input input-bordered"
                {...register("retting", {
                  required: {
                    value: true,
                    message: "Give a rating between 1 and 5",
                  },
                })}
              />
              <label className="label">
                {errors.retting?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors?.retting?.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reviews</span>
              </label>
              <textarea
                name="review"
                className="textarea textarea-bordered h-24"
                {...register("reviewText", {
                  required: {
                    value: true,
                    message: "Please review within 300 words",
                  },
                })}
              ></textarea>
              <label className="label">
                {errors.reviewText?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors?.reviewText?.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control ">
              <button className="btn bg-gradient-to-r from-accent  to-success border-0 text-white text-lg">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviews;
