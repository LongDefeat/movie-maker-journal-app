import React, {useState, useEffect, useContext} from "react";
import UserContext from "../auth/UserContext";
import UserDatabaseApi from "../api/UserDatabaseApi";
import LoadingSpinner from "../common/LoadingSpinner";
import Table from 'react-bootstrap/Table';
import { Container, Button } from "react-bootstrap";
import {AiFillDelete} from "react-icons/ai";
import {MdEdit} from "react-icons/md";



function JournalList(){
    const [journalEntries, setJournalEntries] = useState(null);
    const currentUser = useContext(UserContext);
    
    if(currentUser) {
        useEffect(function getJournalEntries(){
            async function fetchJournalEntries(){
                setJournalEntries(
                    await UserDatabaseApi.getEntries(currentUser.currentUser.id)
                    );};
    
            fetchJournalEntries();
    
        }, [currentUser.id]);
    } 
    if (!journalEntries) return <LoadingSpinner />;
    
    async function handleDelete(id){
        await UserDatabaseApi.deleteEntry(id);
        window.location.reload();
    }
   
    return (
        <Container className="py-5">
            <Table bordered variant="dark"striped>
                        <thead>
                            <tr className="text-center">
                                <th>Entry Date</th>
                                <th>Movie Title</th>
                                <th>Comment</th>
                                {/* <th>Edit</th> */}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
        {journalEntries.map(entry => {
            const date = new Date(entry.created_at).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
            return (
                <>
                            <tr>
                                <td style={{whiteSpace: 'nowrap'}}>{date}</td>
                                <td style={{whiteSpace: 'nowrap'}}>{entry.movie_title}</td>
                                <td>{entry.comment}</td>
                                {/* <td className="text-center"><Button><MdEdit /></Button></td> */}
                                <td className="text-center"><Button variant="danger" onClick={() => handleDelete(entry.id)}><AiFillDelete /></Button></td>
                            </tr>
                </>
            )
        })}
                        </tbody>
                </Table>
        </Container>
    )
}

export default JournalList;