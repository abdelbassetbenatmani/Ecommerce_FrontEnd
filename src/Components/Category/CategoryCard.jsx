import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { baseURL } from "../../API/mainBaseURL";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function CategoryCard({id, title, img }) {
  return (
    <Card className="mt-6">
      <Link to={`/products/category/${id}`}>
        <CardHeader className="relative h-56">
          <img
            alt="zcv"
            src={`${baseURL}/categories/${img}`}
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
        </CardBody>
      </Link>
    </Card>
  );
}
