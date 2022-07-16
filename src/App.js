import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/firebase-config";
import Navbar from "./common/component/navbar";
import route from "./common/constant/string/route.string";
import NotFound from "./screens/404";
import Cart from "./screens/cart";
import Home from "./screens/home";
import Men from "./screens/men";
import Unisex from "./screens/unisex";
import Women from "./screens/women";
import Authentication from "./screens/auth";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { showSignupForm } = useSelector((state) => state.userAuthReducer);
  const queryClient = new QueryClient();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser)
        dispatch({
          type: "LOGIN_REQUEST",
          data: currentUser,
        });
    });
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div style={{ marginTop: "4rem" }}>
            {showSignupForm && <Authentication />}
            <Routes>
              <Route path={route.home} element={<Home />} />
              <Route path={route.men}>
                <Route index element={<Men />} />
                <Route path=":id" element={<Men />} />
                <Route path=":id/:hd" element={<Men />} />
              </Route>
              <Route path={route.women} element={<Women />} />
              <Route path={route.unisex} element={<Unisex />} />
              <Route path={route.cart} element={<Cart />} />
              <Route path={route[404]} element={<NotFound />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// function App() {
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
//           mensApi.addSnkr({
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
//       let res = await mensApi.getAllSnkrs();
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
//       let res = await mensApi.getAllBrandSnkrs(brand);
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
//       let res = await mensApi.deleteSnkr(data.id);
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

// export default App;
