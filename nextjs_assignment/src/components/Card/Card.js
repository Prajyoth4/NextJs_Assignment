import Image from "next/image";
import "./Card.css";

const Card = ({ ele }) => {
  //console.log(ele);
  // width={100} height={100}
  return (
    <div className="card">
      <Image
        src={ele.image}
        width={0}
        height={0}
        sizes="100vw"
        className="card-image"
        alt={ele.id}
      />
      <div>
        <p>{ele.title}</p>
        <div>
          <p>{ele.price}</p>
          <p>{ele.rating.rate}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
