import "./AddEditUser.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddContactMutation,
  useGetSingleContactQuery,
  useEditContactMutation,
} from "../features/api/contactApi";

export const AddEditUser = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    contact: "",
    imgSrc: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const { name, email, contact, imgSrc } = formValue;

  const [addContact] = useAddContactMutation();
  const [editContact] = useEditContactMutation();

  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleContactQuery(id);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setFormValue({ ...data });
    } else {
      setIsEdit(false);
    }
  }, [id, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Please provide value into each input field");
    } else {
      if (!isEdit) {
        await addContact(formValue);
        navigate("/");
        toast.success("Contact Added Successfully");
        console.log(formValue);
      } else {
        await editContact(formValue);
        navigate("/");
        setIsEdit(false);
        toast.success("Contact Updated Successfully");
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div>
      <h2>Add User</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={contact || ""}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="imgSrc">Image URL</label>
        <input
          type="url"
          id="imgSrc"
          name="imgSrc"
          placeholder="Your Profile Image URL ..."
          value={imgSrc || ""}
          onChange={handleInputChange}
          required
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};
