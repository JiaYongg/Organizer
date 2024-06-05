import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios"
import {API} from "../constants"

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    async function login(){
        const response = await axios.post(API + "/user/login", {
            username: username,
            password: password
        })
        const data = response.data;
        console.log(data);
        if (!data){
            alert("Invalid username or password");
            return;
        }
        else{
            navigate("/main");
        }
    }

    return (
    <Container>
        <h1 className="my-3">Login to your account</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/signup">Sign up for an account</a>
            </Form.Group>
            <Button variant="primary" onClick={async (e) => {
                login();
            }}>
            Login
            </Button>
        </Form>
        <p>{error}</p>
    </Container>
    )

}