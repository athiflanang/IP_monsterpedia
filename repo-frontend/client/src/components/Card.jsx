import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ monster }) {
  const navigate = useNavigate();
  const [imgById, setImgById] = useState({});

  // const url = `http://localhost:3000`; /*<<<<< ini url localhost*/
  const url = `https://deploy.athiflanang.site`; /*<<<<< ini url site*/

  async function fetchImageById() {
    try {
      const { data } = await axios.get(`${url}/img/${monster.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setImgById(data.findImageById);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleId(id) {
    navigate(`detail/${id}`);
  }

  useEffect(() => {
    fetchImageById();
  }, []);

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-md transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-100 transition ease-in-out duration-300">
        <figure>
          <img src={imgById?.imgUrl} alt="monster" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{monster?.name}</h2>
          <p>{monster?.description}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-outline btn-info"
              onClick={() => handleId(monster?.id)}
            >
              read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
