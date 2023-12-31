import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Input,
  Badge,
  Collapse,
} from "@material-tailwind/react";
import logo from "../../assets/logo.svg";
import { HiOutlineHeart } from "react-icons/hi";
import { CgShoppingBag } from "react-icons/cg";
import { Link } from "react-router-dom";
import useSearchNavBar from "../../hook/Search/useSearchNavBar";

import { decodeToken } from "../../js/decodeToken";
import useGetUserCart from "../../hook/Cart/useGetUserCart";

export default function NavBar() {
  const [numberItem] = useGetUserCart()
  const [, onChangeSearch] = useSearchNavBar();
  const [openNav, setOpenNav] = useState(false);
  let searchword = "";
  if (localStorage.getItem("searchWord"))
    // eslint-disable-next-line no-const-assign
    searchword = localStorage.getItem("searchWord");
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const activeUser = decodeToken();
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-base">
        <a href="#" className="flex items-center">
          Deals Today
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-base">
        <a href="#" className="flex items-center">
          Offers
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-base">
        <a href="#" className="flex items-center">
          FAQ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-base">
        <a href="#" className="flex items-center">
          Contact
        </a>
      </Typography>
      <div className="w-72">
        <Input
          label="Search Anything ..."
          icon={<i className="fas fa-magnifying-glass" />}
          value={searchword}
          onChange={onChangeSearch}
        />
      </div>
    </ul>
  );


  return (
    <Navbar className="mx-auto py-2 px-4 lg:px-8 lg:py-4 rounded-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {activeUser ? (
          <div className="flex items-center gap-5 lg:gap-3">
            <Link to="/wishlist" className="flex items-center gap-1">
              <Badge
                content="0"
                color="red"
                className="min-w-[20px] min-h-[20px] bg-[#212121] ">
                <IconButton className="bg-red-600">
                  <HiOutlineHeart size={"1rem"} />
                </IconButton>
              </Badge>
              <span className="hidden lg:block">Wishlist</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-1">
              <Badge
                content={numberItem}
                color="red"
                className="min-w-[20px] min-h-[20px] bg-[#212121]">
                <IconButton className="bg-teal-500">
                  <CgShoppingBag size={"1rem"} />
                </IconButton>
              </Badge>
              <span className="hidden lg:block">Shopping</span>
            </Link>
          </div>
        ) : null}

        <IconButton
          variant="text"
          className=" h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>


      </Collapse>
    </Navbar>
  );
}
