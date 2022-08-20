import React from "react";
import styled from "styled-components";

import Gmail from "../../image/svg/gmail.svg";
import facebook from "../../image/svg/facebook.svg";
import instagram from "../../image/svg/instagram.svg";
import tweeter from "../../image/svg/twitter.svg";
import linkedin from "../../image/svg/linkedin.svg";
import { FOOTER } from "../../constant/string/common.string";
import "./styles.css";

function Footer() {
  return (
    <>
      <div className="bottom_border" />
      <div id="footer_container">
        <p id="copyright_text">{FOOTER.COPY_RIGHT}</p>
        <div>
          <ConnectUs />
        </div>
      </div>
    </>
  );
}

export default Footer;

const Connect = [
  {
    title: "Gmail",
    url: "mailto:ajaychwda1997@gmail.com",
    iconUrl: Gmail,
  },
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/ajay-chawda-4530aa174/",
    iconUrl: linkedin,
  },
  {
    title: "Twitter",
    url: "https://twitter.com/Ajaychawda24",
    iconUrl: tweeter,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/ajay_chawda248",
    iconUrl: instagram,
  },

  {
    title: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100005829123942",
    iconUrl: facebook,
  },
];

export const ConnectUs = () => {
  return Connect.map((item) => {
    return (
      <a href={item.url} target={"blank"} id="icons" title={item.title}>
        <Img src={item.iconUrl} alt={item.title} />
      </a>
    );
  });
};

const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: none;
  cursor: pointer;
  transition: all 0.5s;
  box-shadow: 0 3px 5px 2px rgb(64 60 67 / 16%);
  :hover {
    animation: rotation 1s linear;
    box-shadow: 0 2px 5px 5px rgb(64 60 67 / 16%);
  }
  @keyframes rotation {
    0% {
    }
    33% {
      transform: rotate(45deg);
    }
    50% {
    }
    66% {
      transform: rotate(-90deg);
    }
    99% {
      transform: rotate(45deg);
    }
    100% {
      //   transform: scale(1);
    }
  }
`;
