import React, { useEffect, useState } from "react";
import {getCategory} from '../Requests/Request';
import Form from "./Form";
import Questions from "./Questions";
import './style.css'
import './responsive.css'

function Home(){
    const [categories,setCategories]=useState([])
    const [amount,setAmount]=useState("10")
    const [name,setName]=useState("anyCategory")
    const [visibleQuestions,setVisibleQuestions]=useState(false)
    const [visibleForm,setVisibleForm]=useState(true)
    
    function startTesting(){
        setVisibleForm(!visibleForm)
        setVisibleQuestions(!visibleQuestions)
    }
    async function getNames(){
        const res=await getCategory()
        setCategories(res.data.trivia_categories)
    }
    useEffect(()=>{
        getNames()
    },[])
    return(
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mx-auto'>
                        <div className='box'>
                            {visibleForm ? <Form amount={amount} setAmount={setAmount} name={name} setName={setName} categories={categories} startTesting={startTesting}/> : ''}
                            {visibleQuestions ? <Questions name={name} amount={amount} setVisibleForm={setVisibleForm} setVisibleQuestions={setVisibleQuestions} /> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home