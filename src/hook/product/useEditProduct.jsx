import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Redux/Slice/Category/CategoryThunk";
import { getAllBrand } from "../../Redux/Slice/Brand/BrandThunk";
import {
  getOneProduct,
  updateProduct,
} from "../../Redux/Slice/product/ProductThunk";
import { getAllSubCategoryOnCatID } from "../../Redux/Slice/SubCategory/SubCategoryThunk";
import Notify from "../../hooks/useNotify";
import {baseURL} from "../../API/mainBaseURL";

function useEditProduct(productId) {
  const dispatch = useDispatch();
  // States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState(0);
  const [priceAfter, setPriceAfter] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryID] = useState("");
  const [selectSubCategoryId, setSelectSubCategoryID] = useState([]);
  const [brandId, setBrandID] = useState("");
  const [loading, setLoading] = useState(true);
  const [showColor, setShowColor] = useState(false);
  const [colors, setColors] = useState([]);
  const [options, setOptions] = useState([]);
  const [files, setFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  //  select all category sub category brand in redux
  const categories = useSelector((state) => state.category.category);
  const brands = useSelector((state) => state.brand.brand);
  const subCategory = useSelector((state) => state.subCategory.subCategory);
  const product = useSelector((state) => state.product.product);
  const onSelectSubCategory = (selectedList) => {
    setSelectSubCategoryID(selectedList);
  };
  const onRemoveSubCategory = (selectedList) => {
    setSelectSubCategoryID(selectedList);
  };

  //  put categories and brand in selectbox when component render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const run = async () => {
      await dispatch(getAllCategory(`/api/v1/categories`));
      await dispatch(getAllBrand(`/api/v1/brands`));
      await dispatch(getOneProduct(`/api/v1/products/${productId}`));
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.data) {
      setName(product.data.title);
      setDescription(product.data.description);
      setPriceBefore(product.data.price);
      setPriceAfter(product.data.priceAfterDiscount);
      setQuantity(product.data.quantity);
      setColors(product.data.colors);
      setBrandID(product.data.brand);
      setCategoryID(product.data.category._id);
      setFiles(`${baseURL}/products/${product.data.imageCover}`);
      let images = product.data.images.map((image) =>`${baseURL}/products/${image}`)
      setMultipleFiles(images);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const changePriceBefore = (e) => {
    setPriceBefore(e.target.value);
  };
  const changePriceAfter = (e) => {
    setPriceAfter(e.target.value);
  };
  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const getBrandId = (e) => {
    setBrandID(e.target.value);
  };
  const showColorPicker = () => {
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const removedArray = colors.filter((e) => color !== e);
    setColors(removedArray);
  };
  const handleColorCompleteChange = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  const getCategoryId = (e) => {
    setCategoryID(e.target.value);
  };
  useEffect(() => {
    if (categoryId != "0") {
      const run = async () => {
        await dispatch(
          getAllSubCategoryOnCatID(
            `/api/v1/categories/${categoryId}/subcategories`
          )
        );
      };
      if (categoryId) run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  //  fill sub category option based on category id
  useEffect(() => {
    if (subCategory.data) {
      setOptions(subCategory.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, subCategory.data]);

  //  submit form to add product
  const hundelSubmit = async (e) => {
    e.preventDefault();
    if (
      categoryId === "0" ||
      name === "" ||
      description === "" ||
      priceBefore === 0 ||
      quantity === ""
    ) {
      Notify("there are problem with added", "warn");
      return;
    }
    if (priceBefore < priceBefore) {
      Notify(
        "the price after discount must be smaller than before discount",
        "warn"
      );
      return;
    }


    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", priceBefore);
    formData.append("priceAfterDiscount", priceAfter);
    if(files[0].file ===undefined){
      formData.append("imageCover",product.data.imageCover);
    }else{
      formData.append("imageCover",files[0].file);

    }
    formData.append("category", categoryId);
    formData.append("brand", brandId);
    if (colors.length == 1) {
      formData.append("colors", colors);
    } else {
      colors.map((color) => formData.append("colors", color));
    }
    multipleFiles.map((file,index) => {
      if(file.file === undefined){
        formData.append("images",product.data.images[index]);
      }else{
        formData.append("images", file.file)
      }
    });

    const subCategoryIDs = selectSubCategoryId.map((item) => item._id);

    if (subCategoryIDs.every((id) => typeof id === "string")) {
      subCategoryIDs.map((item) => formData.append("subcategories", item));
    } else {
      console.log("there are problem");
    }

      setLoading(true);
      let args = [product.data._id, formData];
      await dispatch(updateProduct(args));
      setLoading(false);

  };
  const products = useSelector((state) => state.product.updateProduct);

  //  reset inputs and show notification
  useEffect(() => {
    if (loading === false) {
      setName("");
      setDescription("");
      setPriceAfter(0);
      setPriceBefore(0);
      setQuantity(0);
      setBrandID("0");
      setCategoryID("0");
      setColors([]);
      setSelectSubCategoryID([]);
      setTimeout(() => setLoading(true), 1500);
      if (products) {
        if (products.status === 200) {
          Notify("Update succsusful", "success");
        } else {
          Notify("Update error ", "error");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return [
    name,

    description,
    priceAfter,
    priceBefore,
    quantity,
    categoryId,
    colors,
    brandId,
    showColor,
    files,
    setFiles,
    multipleFiles,
    setMultipleFiles,
    options,
    categories,
    brands,
    changeName,
    changeDescription,
    changePriceBefore,
    changePriceAfter,
    changeQuantity,
    onSelectSubCategory,
    onRemoveSubCategory,
    getBrandId,
    getCategoryId,
    showColorPicker,
    removeColor,
    handleColorCompleteChange,
    hundelSubmit,
  ];
}

export default useEditProduct;
