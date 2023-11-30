import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetSingleContactQuery } from "../features/api/contactApi";
import { toast } from "react-toastify";
import "./UserDetails.css";

export const UserDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleContactQuery(id);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!");
    }
  }, [error]);

  return (
    <div>
      {isLoading && data ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <div className="card-header">
            <p>User Contact Detail</p>
          </div>
          <div className="container">
            <img src={data?.imgSrc} alt="profile" />
            <br />
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name: </strong>
            <span>{data?.name}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{data?.email}</span>
            <br />
            <br />
            <strong>Contact: </strong>
            <span>{data?.contact}</span>
            <br />
            <br />
            <Link to="/">
              <button className="btn btn-go-back">Go Back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
