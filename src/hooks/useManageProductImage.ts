import axios from "axios";
import Product from "../models/Product";
import { getProductImageActionUrl } from "../services/apiClient";
import useProductFormStore from "../store/useProductFormStore";

const useManageProductImage = () => {
  const existingImageUrl = useProductFormStore((s) => s.existingImageUrl);
  const newImageFile = useProductFormStore((s) => s.newImageFile);

  return async (product: Product) => {
    if (!newImageFile) {
      if (product.imageName && !existingImageUrl) {
        await axios.delete(getProductImageActionUrl(product.id));
      }
      return;
    }

    const formData = new FormData();
    formData.append("file", newImageFile);

    await axios.post(getProductImageActionUrl(product.id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
};

export default useManageProductImage;
