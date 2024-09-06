import Card from "../components/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../../features/fetchingApi";

export default function Homepage() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.fetchingApi);

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="text-6xl font-bold items-center">
          <div className="flex justify-center py-5 text-blue-400">
            Monsterpedia
          </div>
        </div>

        <div className="flex justify-center py-5 mb-5">
          <main className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl px-4 justify-items-center">
            {reviews.length > 0 &&
              !error &&
              reviews.map((data) => {
                return <Card key={data.id} monster={data} />;
              })}
          </main>
        </div>
        <div className="flex justify-items-center justify-center"></div>
      </div>
    </>
  );
}
