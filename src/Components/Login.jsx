import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../Styles/Login.css';
import { useForm } from "react-hook-form";
import LoginImage from '../Asserts/Login.png';
import { ReactTyped } from "react-typed";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios'
import Swal from 'sweetalert2'
export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const response = () => {
            axios.post('http://localhost:8000/users', JSON.stringify(data))
                .then((response) => console.log(response.data))
                .catch((error) => console.error('Error:', error));
        };
        response(); // Call the respone funcation
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: "success",
            title: "Logged In Successfully",
        });
        window.location.reload();
    };

    const handlePaste = (event) => {
        event.preventDefault();
        alert('Pasting is disabled!');
    };

    const handleCopy = (event) => {
        event.preventDefault();
        alert('Copying is disabled!');

    }


    return (
        <>
            <Container fluid className='loginpage-container'>
                <Row className='loginpage-firstrow'>
                    <Col className='login-imagecolumn' xs={12} md={6}>
                        <img className='image' src={LoginImage} alt='Login-Image'></img>
                    </Col>
                    <Col className='form-column' xs={12} md={6}>
                        <Row>
                            <h2>
                                <ReactTyped style={{ color: '#ba68c8' }} strings={["Welcome Back"]} loop typeSpeed={200} />
                            </h2>
                        </Row>
                        <div className='form-div'>
                            <Row><h3>Login</h3></Row>
                            <Row>
                                <p>Does'not have an accout yet? <a href=''>SignUp</a></p>
                            </Row>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label>Email</label><br></br>
                                    <input
                                        type='text'
                                        placeholder='Enter Your Email'
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label>Password</label>< a style={{ marginLeft: '170px' }} href=''>Forgot Password?</a><br></br>
                                    <input
                                        type='password'
                                        onPaste={handlePaste}
                                        onCopy={handleCopy}
                                        placeholder='Enter your Password'
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters long"
                                            },
                                            maxLength: {
                                                value: 14,
                                                message: "Password must be lesser than 14 characters long"
                                            }
                                        })}
                                    />
                                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                                </div>
                                <div>
                                    <Button type='submit'>Login</Button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <hr></hr>
                            <Row><h6> Or SignIn Using</h6></Row>
                            <Button type='checkbox' variant='outline-danger'>Google<GoogleIcon /></Button> <Button type='checkbox' variant='outline-primary'>FaceBook<FacebookIcon /></Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
