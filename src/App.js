import { useEffect, useState } from "react";
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
import OfflineModal from "./common/component/offlineModal";

function App() {
  const dispatch = useDispatch();
  const { showSignupForm } = useSelector((state) => state.userAuthReducer);
  const queryClient = new QueryClient();

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser)
        dispatch({
          type: "LOGIN_REQUEST",
          data: currentUser,
        });
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      setIsOnline(false);
    });

    window.addEventListener("online", function (e) {
      setIsOnline(true);
    });
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setIsOnline(false);
    }
  }, [isOnline]);

  return (
    <div id="main-app-container">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div id="footer-spacing" />
          <div>
            {showSignupForm && <Authentication />}
            {!isOnline && <OfflineModal />}

            <Routes>
              <Route path={route.home} element={<Home />} />
              <Route path={route.men}>
                <Route index element={<Men />} />
                <Route path=":id" element={<Men />} />
              </Route>
              <Route path={route.women}>
                <Route index element={<Women />} />
                <Route path=":id" element={<Women />} />
              </Route>
              <Route path={route.unisex}>
                <Route index element={<Unisex />} />
                <Route path=":id" element={<Unisex />} />
              </Route>
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
