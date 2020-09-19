import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Router, navigate} from '@reach/router'

import Create from "./Create"
import List from "./List"
import Display from "./Display"
import Edit from "./Edit"

const Main = () => {

    const[list, setList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8003/pets")
            .then((res) => {
                console.log(res);
                setList(res.data.pets)
            })
            .catch(err =>{
                console.log(err)
            })
    }, []);

    const addPet = (pet) => {
        setList([...list, pet])
    }

    const updatePet = (addedPet) => {
        setList(list.map(pet => {
            if(pet._id === addedPet._id){
                return addedPet
            } 
            else{
                return pet
            }
        }));
    }

    const adoptPet = (id) => {
        const newList = list.filter(pet => pet._id !== id);
        setList(newList)
    }

    const adoptHandle = (id) => {
        axios.delete(`http://localhost:8003/pets/delete/${id}`)
            .then(res => {
                console.log(res);
                adoptPet(id);
                navigate("/")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div>
            <Router>
                <List list={list} path="/" />
                <Create addPet={addPet} path="/pets/new" />
                <Display adoptHandle={adoptHandle} path="/pets/:id" updatePet={updatePet}/>
                <Edit path="/pets/:id/edit" updatePet={updatePet} list={list}/>
            </Router>
        </div>
    );
}

export default Main;