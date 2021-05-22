import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://picsum.photos/500/500";
  return (
    <div className="img-container">
      <img
        src={imageUrl}
        alt=""
        className="h-60 w-60 cursor-pointer rounded-xl border-2 border-custom-shade2"
      />
    </div>
  );
};

export default ImageHelper;
