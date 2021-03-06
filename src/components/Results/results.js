import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import './results.css'

function Results(props)
{
    const [courses, setCourses] = useState([]);
    const [ token ] = useCookies(['mr-token']);

    useEffect( () => {
        if(!token['mr-token']) window.location.href = '/';
        API.studentOrOffice(token['mr-token'])
        .then(resp => {                
            if(resp === 2) //office
                window.location.href = '/office';
            if(resp === 3) //error
                alert("error")
        })
        .catch(error => console.log(error))

        API.getResults(token['mr-token'])
        .then(resp => setCourses(resp))
        .catch(error => console.log(error))
    }, [token])

    

    if(courses.length === 0)
    {
        return(
            <div className="Rank">
                <Navbar active='תוצאות'/>
                <div className='container-rank' style={{width: '65%', marginLeft: '17.5%',marginTop:'50px'}}>
                    <div className='course_group'>
                        <h1 style={{color: 'white', margin: '25px', marginLeft:'27%'}}>: קורסי הבחירה שקיבלת הם</h1>
                        <div className='whiteLines'>
                            <div className='item' >
                                <div style={{marginLeft:'40%'}}>אין עדין תוצאות </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
    else
    {
        return(
            <div className="Rank">
                <Navbar active='תוצאות'/>
                <p className="results"> תוצאות </p>
                <div className='container-rank' >
                    <div className='course_group'>
                        <h1 style={{color: 'white', marginLeft:'10%'}}>: קורסי הבחירה שקיבלת הם</h1>
                        <div className='whiteLines'>
                            { courses.map((course, index) => {
                            return (
                                <div key={index} className='item'>
                                    <div className='item-title'>
                                        <div className="money"> הדירוג שלך: {course.rank}</div>
                                        <div className='name'>{course.course_group}</div>
                                        <div className='index'>.{index+1}</div>
                                    </div>
                                    <div className='item-details'>
                                        <div> ביום: {course.day} בשעות: {(course.time_start).substring(0, 5)}-{(course.time_end).substring(0, 5)}</div>
                                        <div> סמסטר: {course.Semester}</div>
                                        <div> מרצה: {course.lecturer}</div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
    
}

export default Results;