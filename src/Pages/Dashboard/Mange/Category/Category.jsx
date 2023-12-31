import { Alert } from "@material-tailwind/react";
import Breadcrumb from "../../../../Components/Dashboard/Breadcrumb";
import Pagination from "../../../../Components/Utility/Pagination";
import useGetAllCategory from "../../../../hook/category/useGetAllCategory";
import CategoryTableRow from "../../../../Components/Admin/CategoryTableRow";
const Category = () => {
  const [categories,, pageCount, getPageNumber] = useGetAllCategory();
  return (
    <>
      <Breadcrumb pageName="category" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between gap-8 items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Category
          </h4>
          <div className="grow">
            <input
              type="text"
              placeholder="Search category"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          {pageCount > 1 ? (
            <Pagination numberPages={pageCount} onPress={getPageNumber} />
          ) : null}
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>
        {
          categories?.data?.length>0 ?(
            categories.data.map((category)=>{
             // eslint-disable-next-line react/jsx-key
             return ( <CategoryTableRow key={category._id} category={category}/>)
            })
          ):( <Alert>there are no category found.</Alert>)
        }
      </div>
    </>
  );
};

export default Category;
