import { useState, useEffect } from "react";
import Toastify from "toastify-js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function BookmarkPage({ url }) {
  const [getAllMonster, setAllMonster] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchAllBookmark() {
    try {
      const { data } = await axios.get(`${url}/bookmark`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setAllMonster(data.getAllBookmark);
      console.log(data.getAllBookmark);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
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

  async function deleteBookmark(id) {
    try {
      await axios.delete(`${url}/bookmark/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success delete bookmark",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      fetchAllBookmark();
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

  async function navigateToDetail(monsterId) {
    navigate(`../detail/${monsterId}`);
  }

  useEffect(() => {
    fetchAllBookmark();
  }, []);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Monster Id</th>
              <th>Monster Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllMonster.map((data) => (
              <tr className="hover" key={data?.id}>
                <th>{data?.id}</th>
                <td>{data?.monsterId}</td>
                <td>{data?.monsterName}</td>
                <td>
                  <button
                    className="btn btn-outline btn-error btn-xs mx-4"
                    onClick={() => deleteBookmark(data?.id)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-outline btn-success btn-xs"
                    onClick={() => navigateToDetail(data?.monsterId)}
                  >
                    go to
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
