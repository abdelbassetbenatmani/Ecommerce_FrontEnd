import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { baseURL } from "../../API/mainBaseURL";
import Notify from "../../hooks/useNotify";
import { getOneBrand, updateBrand } from "../../Redux/Slice/Brand/BrandThunk";
const useUpdateBrand = (brandId) => {
  const dispatch = useDispatch();
  // States
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const changeName = (e) => {
    setName(e.target.value);
  };
  const brand = useSelector((state) => state.brand.brand);

  useEffect(() => {
    const run = async () => {
      await dispatch(getOneBrand(`/api/v1/brands/${brandId}`));
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(brand.data){
      setName(brand.data.name);
      setFiles(`${baseURL}/brands/${brand.data.image}`);
    }
  }, [brand])
  
  //  submit form to update the brand
  const hundelSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      Notify("name brand is required", "warn");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    if(files[0].file ===undefined){
      formData.append("image",brand.data.image);
    }else{
      formData.append("image",files[0].file);
    }
      setLoading(true);
      let args = [brand.data._id, formData];
      await dispatch(updateBrand(args));
      setLoading(false);

  };
  const updateBr= useSelector((state) => state.brand.updateBrand);
    //  reset inputs and show notification
    useEffect(() => {
      if (loading === false) {
        setName("");
        setTimeout(() => setLoading(true), 1500);
        if (updateBr) {
          if (updateBr.status === 200) {
            Notify("Update succsusful", "success");
          } else {
            Notify("Update error ", "error");
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);
  
    return [name,files,changeName,setFiles,hundelSubmit]
}

export default useUpdateBrand