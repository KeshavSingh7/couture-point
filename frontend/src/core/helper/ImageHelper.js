import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://picsum.photos/500/500";
  return (
    <div className="rounded  p-2">
      <img
        src="https://picsum.photos/200/300"
        alt="photo"
        className="h-56 w-56 cursor-pointer"
      />
    </div>
  );
};

export default ImageHelper;
