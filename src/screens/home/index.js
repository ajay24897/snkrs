import React from "react";
import Carousel from "../../common/component/carousel";
import Nike from "../../common/image/nike.png";
import Jordan from "../../common/image/jordan.png";
import Adidas from "../../common/image/adidas.png";
import Reebok from "../../common/image/reebok.png";
import Puma from "../../common/image/puma.png";
import Nb from "../../common/image/nb.png";
import JordanNewArrival from "../../common/image/jordan.jpeg";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../common/constant/string/common.string";

let data = [Jordan, Nike, Adidas, Reebok, Nb, Puma];

function Home() {
  const navigate = useNavigate();

  return (
    <div id="home-container">
      <Carousel />
      <div id="heading">
        <p className="home-text sub-heading">{HOME.THIS_IS_SNKRS}</p>
        <p className="home-text line-header">{HOME.MADE_FOR}</p>
        <p className="home-text line-header">{HOME.EVERYTING_YOU_ARE}</p>
        <p id="info-header">{HOME.DESCRIPTION}</p>
      </div>

      {/* <div id="home-background">
        <img src={HomeGB} width={"100%"} height={"80%"} />
        <div id="home-shadow"></div>
      </div> */}
      <h3>{HOME.NEW_ARRIVAL}</h3>
      <div id={"new-arrival"}>
        <img src={JordanNewArrival} id={"new-arrival-image"} alt={"jordan"} />
        <p id="new-arrival-heading">{HOME.NEW_NIKE_SHOE}</p>
        <p id="info-description">{HOME.NIKE_SHO_INFO}</p>
        <button
          id="button-shop"
          onClick={() => navigate("men/6E7F68eXVwOgWqX6HGr1")}
        >
          {HOME.SHOP_NOW}
        </button>
      </div>

      <div id="feature">
        <div class="feature-item">
          <h1>{HOME["500+"]}</h1>
          <p>{HOME.SHOES}</p>
        </div>
        <div class="feature-item">
          <h1>{HOME["100%"]}</h1>
          <p>{HOME.GENUINE_PRODUCT}</p>
        </div>
        <div class="feature-item">
          <h1>{HOME["3_Months"]}</h1>
          <p>{HOME.WARRANTY}</p>
        </div>
      </div>

      <h3>{HOME.TOP_BRANDS}</h3>
      <div id="slider">
        <div class="slide-track">
          {[...data, ...data].map((image) => {
            return (
              <div class="slides">
                <img src={image} width="250px" height="250px" alt="w" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;

// function Home() {
//   let [snkr, setSnkrs] = useState([]);
//   useEffect(() => {
//     console.log("snkr", snkr);
//   }, [snkr]);
//   let obj = [];

//   function convertFileToBase64(url) {
//     return new Promise(async (resolve, reject) => {
//       const data = await fetch(url);
//       const blob = await data.blob();
//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = reject;
//     });
//   }
//   const addData = async () => {
//     console.log(obj);
//     obj.map(async (item, index) => {
//       let {
//         id,
//         brand,
//         colorway,
//         gender,
//         name,
//         year,
//         styleId,
//         releaseDate,
//         retailPrice,
//         title,
//       } = item;
//       console.log(item.media.imageUrl);
//       if (item.media.imageUrl) {
//         let res = await convertFileToBase64(item.media.imageUrl);
//         console.log("res", res);
//         if (res) {
//           unisexApi.addSnkr({
//             id,
//             brand,
//             colorway,
//             gender,
//             name,
//             year,
//             styleId,
//             releaseDate,
//             retailPrice,
//             title,

//             media: res,
//           });
//         }
//       }
//     });
//   };

//   const mensSnkrs = async () => {
//     let arr = [];

//     try {
//       // let res = await mensApi.getAllSnkrs();
//       let res = await unisexApi.getAllSnkrs();
//       res.docs.map((doc) => {
//         console.log(doc.data());
//         arr.push({ ...doc.data(), id: doc.id });

//         // console.log("doc.id", doc.id);
//         // setSnkrs([...snkr, { ...doc.data(), Did: doc.id }]);
//       });
//       setSnkrs([...arr]);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     async function callApi() {
//       // await addData();
//       // await mensSnkrs();
//     }
//     callApi();
//   }, []);

//   const getSelectedSnkr = async (brand) => {
//     let arr = [];
//     try {
//       setSnkrs([]);
//       // let res = await mensApi.getAllSnkrs();
//       let res = await unisexApi.getAllBrandSnkrs(brand);
//       res.docs.map((doc) => {
//         console.log(doc.data());
//         arr.push({ ...doc.data(), id: doc.id });
//         // console.log("doc.id", doc.id);
//         // setSnkrs([...snkr, { ...doc.data(), Did: doc.id }]);
//       });
//       setSnkrs([...arr]);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleDelete = async (data) => {
//     console.log("data", data);
//     try {
//       let res = await unisexApi.deleteSnkr(data.id);
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => getSelectedSnkr("Jordan")}>Jordan</button>
//       <button onClick={() => getSelectedSnkr("Nike")}>Nike</button>
//       <button onClick={() => getSelectedSnkr("adidas")}>Adidas</button>
//       <button onClick={() => getSelectedSnkr("Puma")}>Puma</button>
//       <button onClick={() => getSelectedSnkr("New Balance")}>
//         New Balance
//       </button>
//       <button onClick={() => getSelectedSnkr("Reebok")}>Reebok</button>

//       <br />

//       {snkr?.map((data) => (
//         <>
//           <img src={data.media} width="100px" height="100px" />
//           <h1 onClick={async () => await handleDelete(data)}>Delete </h1>
//         </>
//       ))}
//     </div>
//   );
// }
