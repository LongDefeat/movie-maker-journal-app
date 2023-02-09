import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserDataBaseApi from "../api/UserDatabaseApi";
import UserContext from "../auth/UserContext";
import Alert from "react-bootstrap/Alert";
import { Row, Col, Form, Button } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import {AiFillDelete} from "react-icons/ai";
import "./ProfileForm.css";

function ProfileForm(){
    const currentUser = useContext(UserContext);
    console.log('Profile form user: ', currentUser);
 
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    const navigate = useNavigate();
    const [updateProfileFormData, setUpdateProfileFormData] = useState({
        username: "",
        password: "",
    });

    /** Handles form submission */
    async function handleSubmit(e){
        e.preventDefault();
        console.log("handle submit working");
        let updatedUser;
        try{
            updatedUser = await UserDataBaseApi.profile(currentUser.currentUser.username, updateProfileFormData);
            console.log(updatedUser);    
        }catch (err){
            setFormErrors(err);
            return;
        }   
        setUpdateProfileFormData( (formData) => ({...formData, password: ""}) ) 
        setFormErrors([]);
        setSaveConfirmed(true);
        currentUser.setCurrentUser(updatedUser);
    }


    /** Update form data field */
    function handleChange(e){
        const {name, value} = e.target;
        setUpdateProfileFormData(data => ({...data, [name]: value}));
        setFormErrors([]);
    }
    console.log(updateProfileFormData)

    /** Delete user */
    function handleDelete(){
        alert('Are you sure you want to delete this user?')
    }
    if (!currentUser) return <LoadingSpinner />;

    return (
        <div className="py-5">
            <Row className="justify-content-center">
                <Col lg={6}>
                    <h3>Profile</h3>
                    <Form className="p3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Change Username</Form.Label>
                            <Form.Control type="text" 
                                        placeholder="Enter New Username"
                                        name="username"
                                        className="form-control"
                                        value={updateProfileFormData.username} 
                                        onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your information with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Change Password</Form.Label>
                            <Form.Control type="password" 
                                        placeholder="Password"
                                        name="password"
                                        className="form-control"
                                        value={updateProfileFormData.password}
                                        onChange={handleChange} 
                            />
                        </Form.Group>
                        <Row className="justify-content-between">
                            <Col className="col-auto">
                                <Button variant="outline-success" type="submit" onClick={handleSubmit}>
                                    Submit</Button>
                            </Col>

                            <Col className="col-auto">
                                <Button variant="outline-danger" onClick={handleDelete}><AiFillDelete />Delete User</Button>
                            </Col>
                            
                        </Row>
                        
                    </Form>
                {saveConfirmed ? (<Alert variant="success">Successfully updated profile!</Alert>)
                :
                null}
                </Col>
            </Row>
        </div>
    )
}

export default ProfileForm;