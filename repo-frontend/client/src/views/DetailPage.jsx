import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import { marked } from "marked";
import parse from "html-react-parser";

export default function DetailPage({ url }) {
  const { id } = useParams();
  const [findId, setFindId] = useState([]);
  const [GeminiPrompt, setGeminiPrompt] = useState("");
  const [getAddBookmark, setAddBookmark] = useState({});
  const [findImgById, setFindImgById] = useState({});

  async function PopulateDetailMonster() {
    try {
      const { data } = await axios.get(`${url}/monster/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data.data);

      setFindId(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMonsterImageById() {
    try {
      const { data } = await axios.get(`${url}/img/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data.findImageById);
      setFindImgById(data.findImageById);
    } catch (error) {
      console.log(error);
    }
  }

  async function getGeminiPrompt() {
    try {
      const { data } = await axios.post(
        `${url}/gemini/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      console.log(parse(marked.parse(data.text)));
      setGeminiPrompt(parse(marked.parse(data.text)));
    } catch (error) {
      console.log(error);
    }
  }

  async function addBookmark() {
    try {
      const { data } = await axios.post(
        `${url}/bookmark/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Toastify({
        text: "Success Add Bookmark",
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
      setAddBookmark(data.data);
    } catch (error) {
      console.log;
    }
  }

  useEffect(() => {
    PopulateDetailMonster();
  }, []);
  useEffect(() => {
    fetchMonsterImageById();
  }, []);
  return (
    <>
      <div className="bg-white h-screen w-full">
        <div className="text-6xl font-bold items-center">
          <div className="flex justify-center py-5 text-blue-400">
            {findId?.name}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-items-center">
            <div className="flex justify-center items-center gap-4 mx-10">
              <img
                src={findImgById?.imgUrl}
                alt=""
                className="w-1/2 flex justify-center rounded-3xl"
              />
              <p className="p-6 bg-blue-300 h-full rounded-3xl text-3xl font-bold text-white">
                Description:
                <p className="text-xl font-medium">{findId?.description}</p>
                <div className="flex gap-4">
                  <button
                    className="btn btn-info align-bottom mt-5"
                    onClick={() => addBookmark(findId?.id)}
                  >
                    Bookmark
                  </button>
                  <Link to={`/uploadImg/${findId?.id}`}>
                    <button className="btn btn-primary align-bottom mt-5">
                      Add Image
                    </button>
                  </Link>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-success mt-10 text-white mb-5"
            onClick={() => getGeminiPrompt()}
          >
            Generate Fun Fact
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-3/5 h-40 outline outline-blue-300 mb-5 rounded-3xl">
            <p className="p-6 text-black">{GeminiPrompt}</p>
          </div>
        </div>
      </div>
    </>
  );
}
