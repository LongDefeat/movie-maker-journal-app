import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import UserDatabaseApi from "../api/UserDatabaseApi";
import {FaPencilAlt} from "react-icons/fa";
import {FiSend} from "react-icons/fi";


function JournalForm({movieTitle, movieId, userId, closeModal}){
    const [journalFormData, setJournalFormData] = useState({
        comment: "",
        movie_id: movieId,
        user_id: userId,
        movie_title: movieTitle,
    });

    // Need to change
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setJournalFormData(data => ({...data, [name]: value}));
    }

    async function handleSubmit(e){
        let res = await UserDatabaseApi.journalMovieReview(userId, journalFormData);
        if (res.success){
            // need to change
           navigate("/")
        } else {
            console.log(res.errors);
        }
    }

    console.log(journalFormData);
    return (
        <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Journal Entry <FaPencilAlt /></Form.Label>
                    <Form.Control name="comment"
                                  value={journalFormData.comment}
                                  onChange={handleChange} 
                                  as="textarea" rows={5} 
                                  placeholder="Thoughts on the movie?" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => 
                    {handleSubmit();
                    closeModal()}
                    }>
                    Submit <FiSend />
                </Button>
        </Form>
    )
}

export default JournalForm;