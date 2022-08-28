import React, { useEffect, useRef, useState } from "react";
import file from "./svg/horizontal-logo.svg";
import { collection } from "./collection";
import "./style.css";

const defaultIconColor = "#CCCCCC";

async function getSVG(iconName) {
  const icon = collection.find((item) => item.name === iconName);
  return await fetch(icon.file)
    .then((res) => res.text())
    .then((res) => {
      const svgString = res.replace(/<\/?(g)\b[^<>]*>/g, "");
      const parser = new DOMParser();
      const svgDom = parser.parseFromString(svgString, "image/svg+xml");
      return svgDom.firstElementChild;
    });
}

export default function WvIcon(props) {
  const { size, color, icon } = props;
  const svgRef = useRef(null);
  useEffect(() => {
    if (icon) {
      getSVG(icon).then((res) => {
        if (res) {
          res.style.height = size;
          res.style.width = "auto";
          res.classList.add("wv-icon");
          for (let i = 0; i < res.children.length; i++) {
            res.children[i].classList.add("wv-element");
            if (res.children[i].tagName === "style") {
              res.children[i].remove();
            }
          }
          svgRef.current.innerHTML = "";
          svgRef.current.append(res);
        }
      });
    }
  }, []);

  return <span ref={svgRef}></span>;
}
