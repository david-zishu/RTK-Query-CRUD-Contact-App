import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../features/api/contactApi";
import { useEffect } from "react";
import "./Home.css";

export const Home = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      await deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!");
    }
  }, [error]);

  return (
    <div className="home">
      <h2>RTK Query CRUD with React and JSON Server</h2>
      <Link to="/add">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && !isLoading ? (
            data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>
                    <img src={item.imgSrc} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
