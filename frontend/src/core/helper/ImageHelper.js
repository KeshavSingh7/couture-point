import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://picsum.photos/500/500";
  return (
    <div className="img-container">
      <img
        src="https://picsum.photos/200/300"
        alt=""
        className="h-60 w-60 cursor-pointer"
      />
    </div>
  );
};

export default ImageHelper;
