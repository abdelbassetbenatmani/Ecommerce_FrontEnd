import { Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Breadcrumb from "../../../../Components/Dashboard/Breadcrumb";
import { CompactPicker } from "react-color";
import { ToastContainer } from "react-toastify";
import useAddProduct from "../../../../hook/product/useAddProduct";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import "filepond/dist/filepond.min.css";

export default function AddProduct() {
  const [
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
  ] = useAddProduct();
  return (
    <>
      <Breadcrumb pageName="Add product" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Product Name:
          </label>
          <input
            value={name}
            onChange={changeName}
            type="text"
            placeholder="Product Name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Product Description:
          </label>
          <textarea
            value={description}
            rows={6}
            onChange={changeDescription}
            placeholder="Product Description"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Price before discount:
          </label>
          <input
            value={priceBefore}
            type="number"
            onChange={changePriceBefore}
            placeholder="Price before descount"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Price:
          </label>
          <input
            value={priceAfter}
            onChange={changePriceAfter}
            type="number"
            placeholder="Price"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Quantity:
          </label>
          <input
            value={quantity}
            onChange={changeQuantity}
            type="number"
            placeholder="Quantity"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">Brand</label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                className="fill-current">
                <path d="M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z" />
              </svg>
            </span>
            <select
              value={brandId}
              onChange={getBrandId}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option value="0">Choose Brand</option>
              {brands.data
                ? brands.data.map((brand) => {
                    return (
                      <option value={brand._id} key={brand._id}>
                        {brand.name}
                      </option>
                    );
                  })
                : null}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Category
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                className="fill-current">
                <path d="m261-526 220-354 220 354H261ZM706-80q-74 0-124-50t-50-124q0-74 50-124t124-50q74 0 124 50t50 124q0 74-50 124T706-80Zm-586-25v-304h304v304H120Zm586.085-35Q754-140 787-173.085q33-33.084 33-81Q820-302 786.916-335q-33.085-33-81.001-33Q658-368 625-334.915q-33 33.084-33 81Q592-206 625.084-173q33.085 33 81.001 33ZM180-165h184v-184H180v184Zm189-421h224L481-767 369-586Zm112 0ZM364-349Zm342 95Z" />
              </svg>
            </span>
            <select
              value={categoryId}
              onChange={getCategoryId}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option value="0">Choose Category</option>
              {categories.data
                ? categories.data.map((category) => {
                    return (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    );
                  })
                : null}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Sub Category
          </label>
          <div className="relative z-20 bg-white dark:bg-form-input">
            <Multiselect
              className="mt-2 text-end"
              placeholder="Sub category"
              options={options}
              onSelect={onSelectSubCategory}
              onRemove={onRemoveSubCategory}
              displayValue="name"
              style={{
                chips: {
                  background: "rgb(28 36 52 / var(--tw-bg-opacity))",
                },
                multiselectContainer: {
                  color: "rgb(28 36 52 / var(--tw-bg-opacity))",
                },
                searchBox: {
                  border:
                    "1px solid rgb(226 232 240 / var(--tw-border-opacity))",
                  padding: "12px",
                  "borderRadius": "4px",
                },
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Colors:
          </label>
          <div className="mt-1 flex">
            {colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      key={index}
                      onClick={() => removeColor(color)}
                      className="w-8 h-8 ms-2 border rounded-full mt-1 cursor-pointer"
                      style={{ backgroundColor: color }}></div>
                  );
                })
              : null}

            <AiOutlinePlusCircle
              className="w-8 h-8 ms-2 mt-1 dark:text-white text-gray-900 cursor-pointer"
              onClick={showColorPicker}
            />
            {showColor === true ? (
              <CompactPicker onChangeComplete={handleColorCompleteChange} />
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Cover Image:
          </label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={1}
            name="files"
            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
          />
         
        </div>
        <div className="my-4">
          <label className="mb-3 block text-black dark:text-white">
            Product images:
          </label>
          <FilePond
          files={multipleFiles}
          onupdatefiles={setMultipleFiles}
          allowMultiple={true}
          maxFiles={5}
          name="files"
          labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
        />
        </div>

        <Link
          to="#"
          onClick={hundelSubmit}
          className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-4">
          Add
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}