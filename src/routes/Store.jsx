import { useLocation, useParams } from 'react-router-dom';
import { useState } from "react";

export default function Store() {
  const [data, updateData] = useState([]);

  return (
    <div className="profileClass custom-bg">
      <h1>User Store</h1>
    </div>
  );
};