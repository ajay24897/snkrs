import { useEffect, useState } from "react";
import "./App.css";
import mensApi from "./firebase/services/snkrs.services";

function App() {
  let [snkr, setSnkrs] = useState([]);
  useEffect(() => {
    console.log("snkr", snkr);
  }, [snkr]);
  let obj = [
    {
      brand: "Jordan",
      colorway: "White/Worn Blue-Metallic Gold",
      gender: "women",
      id: "e5352103-71dc-4b8a-bdca-b561aa924143",
      media: {
        imageUrl:
          "https://images.stockx.com/images/Air-Jordan-Point-Lane-Cool-Grey.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&trim=color&q=90&dpr=2&updated_at=1648701232",
      },
      name: "Denim (W)",
      releaseDate: "2022-09-23",
      retailPrice: 170,
      shoe: "Jordan 1 High OG",
      styleId: "DM9036-104",
      title: "Jordan 1 High OG Denim (W)",
      year: 2022,
    },
  ];

  function convertFileToBase64(url) {
    return new Promise(async (resolve, reject) => {
      const data = await fetch(url);
      const blob = await data.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const addData = async () => {
    console.log(obj);
    obj.filter(async (item, index) => {
      console.log(item.media.imageUrl);
      if (item.media.imageUrl) {
        let res = await convertFileToBase64(item.media.imageUrl);
        console.log("res", res);
        if (res) {
          mensApi.addSnkr({
            ...item,
            media: res,
          });
        }
      }
    });
  };

  const mensSnkrs = async () => {
    try {
      let res = await mensApi.getAllSnkrs();

      res.docs.map((doc) => {
        console.log(doc.data());
        setSnkrs([...snkr, doc.data()]);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    async function callApi() {
      // await addData();
      await mensSnkrs();
    }
    callApi();
  }, []);

  return (
    <div className="App">
      {snkr?.map((data) => (
        <img src={data.media} />
      ))}
    </div>
  );
}

export default App;
