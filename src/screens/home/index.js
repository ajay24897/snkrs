import React from "react";
import Carousel from "../../common/component/carousel";
import Nike from "../../common/image/nike.png";
import Jordan from "../../common/image/jordan.png";
import Adidas from "../../common/image/adidas.png";
import Reebok from "../../common/image/reebok.png";
import Puma from "../../common/image/puma.png";
import Nb from "../../common/image/nb.png";
import HomeGB from "../../common/image/home-background.jpg";

import "./styles.css";

let data = [Jordan, Nike, Adidas, Reebok, Nb, Puma];

function Home() {
  return (
    <div id="home-container">
      <div id="heading">
        <p className="home-text sub-heading">This is SNKRS</p>
        <p className="home-text line-header">MADE FOR</p>
        <p className="home-text line-header">EVERYTING YOU ARE</p>
        <p id="info-header">
          The SNKRS collection is designed and tested by top designer. Giving
          you the freedom to move however you want to, throughout your entire
          journey.
        </p>
      </div>

      {/* <div id="home-background">
        <img src={HomeGB} width={"100%"} height={"80%"} />
        <div id="home-shadow"></div>
      </div> */}
      <Carousel />
      <div id="feature">
        <div class="feature-item">
          <h1>500+</h1>
          <p>Shoes</p>
        </div>
        <div class="feature-item">
          <h1>100%</h1>
          <p>Genuine product</p>
        </div>
        <div class="feature-item">
          <h1>3 Months</h1>
          <p>Warrenty</p>
        </div>
      </div>

      <h3 id="top-brand">Top Brands</h3>
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
