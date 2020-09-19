import React from 'react'
import {Link} from '@reach/router'
import "./style.css"

const List = ({list}) => {



    return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to="/pets/new">add a pet to the shelter</Link>
            <h3>These pets are looking for a good home</h3>
            <hr></hr>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((pet, idx)=> 
                            <tr key={idx}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>
                                    <Link to={`/pets/${pet._id}`}>Details</Link>
                                    <br></br>
                                    <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default List