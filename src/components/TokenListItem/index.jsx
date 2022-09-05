import { BrowserRouter as Router, Link } from "react-router-dom";
import './style.css';

function TokenCard(data) {
  const newTo = {
    pathname: "/asset/" + data.data.id,
  };
  return (
    <Link to={newTo}>
      <div className="card-wrap">
        <div className="token-image-wrap">
            <img
            src={data.data.image}
            alt=""
            className="vh-centered"
            />
        </div>
        <div className="token-name">
            {data.data.name}
        </div>
        <div className="author">
          <div className="avatar" />
          <div className="owner">@owner.username</div>
        </div>
      </div>
    </Link>
  );
}

export default TokenCard;
