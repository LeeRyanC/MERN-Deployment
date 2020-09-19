import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {navigate, Link} from '@reach/router'

const Edit = ({id, updatePet, list}) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [skill1, setSkill1] = useState("")
    const [skill2, setSkill2] = useState("")
    const [skill3, setSkill3] = useState("")
    const [likes, setLikes] = useState()

    const [errors, setErrors] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8003/pets/${id}`)
            .then(res => {
                console.log(res);
                setName(res.data.pet.name);
                setType(res.data.pet.type);
                setDescription(res.data.pet.description);
                setSkill1(res.data.pet.skill1);
                setSkill2(res.data.pet.skill2);
                setSkill3(res.data.pet.skill3);
                setLikes(res.data.pet.likes)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const editHandle = (e) => {
        e.preventDefault();
        const pet = {
            name: name,
            type: type,
            description: description,
            skill1: skill1,
            skill2: skill2,
            skill3: skill3,
            likes: likes
        }
        axios.put(`http://localhost:8003/pets/update/${id}`, pet)
            .then(res => {
                console.log(res)
                updatePet(res.data.pet)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                console.log(err.response.data.errors);
                const errorRes = err.response.data.errors
                const keys = Object.keys(errorRes);
                const newErrors = []
                for(let error of keys){
                    newErrors.push(errorRes[error].message)
                }
                setErrors(newErrors)
            })
    }

    return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to="/">back to home</Link>
            <h3>Edit {name}</h3>
            <br></br>
            {
                errors.map((error, idx) =>
                    <p style={{color: "red"}} key={idx}>{error}</p>
                )
            }
            <form onSubmit={editHandle}>
                <label>Pet Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Pet Type: </label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                <label>Pet Description: </label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <br></br>
                <p>Skills (optional): </p>
                <label>Skill 1: </label>
                <input type="text" value={skill1} onChange={(e) => setSkill1(e.target.value)} />
                <label>Skill 2: </label>
                <input type="text" value={skill2} onChange={(e) => setSkill2(e.target.value)} />
                <label>Skill 3: </label>
                <input type="text" value={skill3} onChange={(e) => setSkill3(e.target.value)} />
                <br></br>
                <input type="submit" value="Edit Pet" />
            </form>
        </div>
    );
}

export default Edit;