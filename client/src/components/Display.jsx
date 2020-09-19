import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from '@reach/router'
import './style.css'

const Display = ({id, adoptHandle, updatePet}) => {

    const [pet, setPet] = useState("")
    const [likes, setLikes] = useState(0)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8003/pets/${id}`)
            .then((res) => {
                console.log(res);
                setPet(res.data.pet)
                setLikes(res.data.pet.likes)
            })
            .catch(err =>{
                console.log(err)
            })
    }, []);

    const likeHandler = (e) => {
        if(disable === false){
            setDisable(true)
        }
        axios.put(`http://localhost:8003/pets/update/${id}`, {likes: likes + 1})
            .then(res => {
                console.log(res)
                updatePet(res.data.pet)
            })
            .catch(err => {
                console.log(err)
            });
        setLikes(likes + 1)
    }
    

    return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to="/">back to home</Link>
            <h3>Details about: {pet.name}</h3>
            <input type="button" value={`Adopt ${pet.name}`} onClick={(e) => {adoptHandle(id)}} />
            <br></br>
            <div className="border">
                <p>Pet type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <p>Skills: {pet.skill1}</p>
                <p>{pet.skill2}</p>
                <p>{pet.skill3}</p>
                <br></br>
                <input type="button" value={`Like ${pet.name}`} disabled={disable} onClick={likeHandler} />
                <p>{pet.likes} like(s)</p>
            </div>
        </div>
    );
}

export default Display;