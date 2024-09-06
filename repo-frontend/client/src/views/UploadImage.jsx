import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";

export default function UploadImage({ url }) {
  const { id } = useParams();
  const [findMonster, setFindMonster] = useState([]);
  const [findImg, setFindImg] = useState({});
  const [uploadImg, setUploadImg] = useState(null);
  const navigate = useNavigate();

  async function fetchMonsterById() {
    try {
      const { data } = await axios.get(`${url}/monster/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data.data);
      setFindMonster(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchImageMonsterById() {
    try {
      const { data } = await axios.get(`${url}/img/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data.findImageById);
      setFindImg(data.findImageById);
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImageById(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imgUrl", uploadImg);

      const { data } = await axios.post(`${url}/upload/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);
      Toastify({
        text: "Upload image successfully!",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#8BC34A",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      fetchMonsterById();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
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

  function navigateToDetail(id) {
    navigate(`../detail/${id}`);
  }

  useEffect(() => {
    fetchMonsterById();
  }, []);

  useEffect(() => {
    fetchImageMonsterById();
  }, []);

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col mt-10">
          <div className="text-center lg:text-center">
            <h3 className="text-5xl font-bold">Upload Image</h3>
            <p className="py-6">Uploade the monster image</p>
          </div>
          <div className="card bg-base-100 shadow-2xl">
            <form
              onSubmit={uploadImageById}
              encType="multipart/form-data"
              className="card-body grid grid-cols-2"
            >
              <div className="form-control">
                <label className="label flex justify-center">
                  <span className="label-text font-semibold">
                    Image URL / File
                  </span>
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadImg(e.target.files[0])}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label flex justify-center">
                  <span className="label-text font-semibold">
                    Current Monster Image
                  </span>
                </label>
                <img
                  src={findImg?.imgUrl}
                  alt="Current Image"
                  className="max-w-sm rounded-lg shadow-md"
                />
              </div>
              <div className="form-control mt-6 grid grid-cols-2 gap-3">
                <button type="submit" className="btn btn-success">
                  Upload Image
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => navigateToDetail(findMonster?.id)}
                >
                  Back to detail
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
