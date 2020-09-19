import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {navigate, Link} from '@reach/router'

const Create = ({addPet}) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [skill1, setSkill1] = useState("")
    const [skill2, setSkill2] = useState("")
    const [skill3, setSkill3] = useState("")

    const [errors, setErrors] = useState([])

    const submitHandler = (e) => {
        e.preventDefault();
        const newPet = {
            name: name,
            type: type,
            description: description,
            skill1: skill1,
            skill2: skill2,
            skill3: skill3,
        }
        axios.post("http://localhost:8003/pets/new", newPet)
            .then(res => {
                console.log(res);
                addPet(res.data.pet)
                navigate("/")
            })
            .catch(err => {
                console.log(err.response.data.errors);
                const keys = Object.keys(err.response.data.errors);
                const newErrors = []
                for(let error of keys){
                    newErrors.push(err.response.data.errors[error].message)
                }
                setErrors(newErrors)
            });
    }

    return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to="/">back to home</Link>
            <h3>Know a pet needing a home?</h3>
            <br></br>
            {
                errors.map((error, idx) =>
                    <p style={{color: "red"}} key={idx}>{error}</p>
                )
            }
            <form onSubmit={submitHandler}>
                <label>Pet Name: </label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
                <label>Pet Type: </label>
                <input type="text" onChange={(e) => setType(e.target.value)}/>
                <label>Pet Description: </label>
                <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                <br></br>
                <p>Skills (optional): </p>
                <label>Skill 1: </label>
                <input type="text" onChange={(e) => setSkill1(e.target.value)}/>
                <label>Skill 2: </label>
                <input type="text" onChange={(e) => setSkill2(e.target.value)}/>
                <label>Skill 3: </label>
                <input type="text" onChange={(e) => setSkill3(e.target.value)}/>
                <br></br>
                <br></br>
                <input type="submit" value="Add Pet" />
            </form>
        </div>
    );
}

export default Create;