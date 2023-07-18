import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Dialog,
    DialogBody,
    Button,
    ButtonGroup
  } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Counter from "../Utility/Counter";
import { Link } from "react-router-dom";


  // eslint-disable-next-line react/prop-types
  export default function ProductSearchCard({desc,value}) {
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);
    return (

    <Fragment>
      <Card className="relative bg-red cursor-pointer duration-300 rounded-md hover:-translate-y-2" onClick={handleOpen}>
        <CardHeader shadow={false} floated={false} className="h-72 rounded-md m-0">
          <img 
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" 
            className="w-full rounded-none h-full object-cover"
          />
        </CardHeader>
        <CardBody>

            <Typography color="blue-gray" className="font-semibold text-base mb-2 truncate ">
              {value}
            </Typography>
            
            <Typography variant="small" color="gray" className="font-normal opacity-75 text-sm truncate ">
                {desc}
            </Typography>
            <div className="flex gap-7 mt-3">
                <Typography color="blue-gray" className="font-semibold text-base">
                $95.00
                </Typography>
                <Typography color="blue-gray" className="font-medium opacity-75 line-through text-sm">
                $195.00
                </Typography>
            </div>
        </CardBody>
        

   
        
      </Card>
      <Dialog open={open} handler={handleOpen} size="lg" >
        <div className="flex justify-end py-3 ">
            <XMarkIcon className="mr-3 h-5 w-5 cursor-pointer" onClick={handleOpen} />
        </div>
      <DialogBody divider className="p-0 overflow-scroll">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 h-full">
          <img 
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" 
          className="w-full rounded-bl-lg h-full object-cover"
          />
          </div>
          <div className="py-6 w-full lg:w-1/2 pe-5">
            <Typography  className=" text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
              {value}
            </Typography>
            
            <Typography variant="small" color="gray" className="text-sm leading-6 md:text-body md:leading-7">
                {desc}
            </Typography>
            <div className="flex gap-3 mt-3">
                <Typography  className="font-semibold text-base md:text-xl lg:text-2xl">
                $95.00
                </Typography>
                <Typography  className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                $195.00
                </Typography>
            </div>
            <div className="my-5">
                <Typography className="text-black text-xl font-semibold">
                    Size
                </Typography>
                <ButtonGroup size="sm" className="flex gap-4 divide-x-0 divide-y-0" >
                    <Button  className="bg-white border-2 border-gray-300 hover:border-gray-800 text-gray-900 rounded-md">S</Button>
                    <Button className="bg-white border-2 border-gray-300 hover:border-gray-800 text-gray-900 rounded-md">M</Button>
                    <Button className="bg-white border-2 border-gray-300 hover:border-gray-800 text-gray-900 rounded-md">L</Button>
                    <Button className="bg-white border-2 border-gray-500 hover:border-gray-800 text-gray-900 rounded-md">XL</Button>
                </ButtonGroup>
            </div>
            <div className="my-5">
                <Typography className="text-black text-xl font-semibold">
                    Color
                </Typography>
                <ButtonGroup size="sm" className="flex gap-4 mt-3 divide-x-0 divide-y-0 h-8" >
                    <Button  className="bg-orange-900 text-gray-900 rounded-md"></Button>
                    <Button className="bg-purple-300 text-gray-900 rounded-md"></Button>
                    <Button className="bg-pink-600  text-gray-900 rounded-md"></Button>
                    <Button className="bg-red-800   text-gray-900 rounded-md"></Button>
                </ButtonGroup>
            </div>
            <div className="flex items-center gap-3 my-5">

            <Counter/>
            <Button className=" bg-gray-900 py-3 flex justify-center items-center gap-2 capitalize font-semibold text-sm hover:opacity-80" fullWidth>
             Add to Card
            </Button>
            </div>
            <Link to='/products/:id'>
            <Button className="mt-6 bg-gray-900 py-4 flex justify-center items-center gap-2 capitalize font-semibold text-sm hover:opacity-80" fullWidth>
             View Details
            </Button>
            </Link>
          </div>
        </div>
      </DialogBody>
    </Dialog>
    </Fragment>
      
    );
  }