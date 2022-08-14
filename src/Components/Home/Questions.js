import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getQuestionsArray } from "../Requests/Request";
import './style.css'

function Questions({name,amount,setVisibleForm,setVisibleQuestions}){
    const [number,setNumber]=useState(0)
    const [quiz,setQuiz]=useState([])
    const [correct,setCorrect]=useState([])
    const [disabled,setDisabled]=useState({prev:true,next:false})
    const [correctAnswers,setCorrectAnswers]=useState(0)
    const [modalVisible,setModalVisible]=useState(false)
    const [results,setResults]=useState([])  
    async function getQuestions(){
        const data=await getQuestionsArray(amount,name)
        let answers=[],answers1=[]
        data.data.results.map(item=>{
            answers.push([item.correct_answer,...item.incorrect_answers])
            answers1.push(item.correct_answer)
        })
        let obj=[]
        answers.map(item=>{
            obj.push(item.map(item1=>{
                return {id:Math.floor(Math.random()*4555),
                answerText:item1,
                selected:false}
            }))
        })
        let finalQUestions=[]
        data.data.results.map((item,index)=>{
            finalQUestions.push({quesText:item.question,options:obj[index]})
        })
        setCorrect(answers1)
        setQuiz(finalQUestions)
    }
    function changeQuestion(index){
        if(index===0){
            setDisabled({prev:true, next:false})
        }
        else if(index===quiz.length-1){
            setDisabled({prev:false, next:true})
        }
        else {
            setDisabled({prev:false, next:false})
        }
        setNumber(index)
    }
    function changeNumber(num){
        let obj=disabled
        if(num===1){
            obj.prev=false
            if(number==quiz.length-1){
                obj.next=true
            }
            else setNumber(number+1)
        }
        else if(num===-1){
            obj.next=false
            if(number===0){
                obj.prev=true
            }
            else {
                setNumber(number-1)
            }
        }
        setDisabled(obj)        
    }
    function selectAnswer(id,elementID){
        let obj=quiz
        obj[number].options.map(item=>{
            item.selected=false
            document.getElementById(item.id).classList.remove('selected')
        })
        obj[number].options[id].selected=!quiz[number].options[id].selected
        let element=document.getElementById(elementID)
        element.classList.add("selected")
        setQuiz(obj)
    }
    function finishQuiz(){
        let i=0;
        quiz.map((item,index)=>{
            item.options.map(item1=>{
                if(item1.selected && item1.answerText==correct[index]){
                    i++
                }
            })
        })
        setCorrectAnswers(i)
        setModalVisible(!modalVisible)
    }
    function showResults(){
        let obj=[]
        quiz.map((item,index)=>{
            item.options.map(item1=>{
                if(item1.selected){
                    obj.push({quetionNumber:index+1,answer:item1.answerText})
                }
            })
        })
        setResults(obj)
        document.getElementById('results').style.display="block"
    }
    useEffect(()=>{
        getQuestions()
    },[])
    return(
        <>
            <div className="questions">
                <div className="header">
                    {quiz.map((item,index)=><button 
                    
                    type="button" 
                    
                    key={index} 
                    
                    className={`btn ${index===number ? `btn-info` : `btn-outline-info`}`}
                    
                    onClick={()=>changeQuestion(index)}

                    >
                        <span>{index+1}</span>
                        
                    </button>)}
                </div>
                <div className="body">
                    <div className="card-box my-3">
                        <div className="card-header">
                            <h3>{quiz.length>0 ?  quiz[number].quesText : ''}</h3>
                        </div>
                        <div className="card-box-body">
                            <ul className="selectAnswer">
                                {quiz.length>0 ?  quiz[number].options.map((item,index)=><li key={item.id} onClick={()=>selectAnswer(index,item.id)} className={`answer ${item.selected ? ` selected` : ''}`} id={item.id}>{item.answerText}</li>) : ''}
                            </ul>
                        </div>
                    </div>
                    <div className="card-footer button-footer">
                        <div className="left">
                            <button type="button" className="btn-slide" disabled={disabled.prev} onClick={()=>changeNumber(-1)}>Previous</button>
                            <button type="button" className="btn-slide" disabled={disabled.next} onClick={()=>changeNumber(1)}>Next</button>
                        </div>
                        <div className="right">
                            <button className="btn-finish" type={"button"} onClick={finishQuiz}>Finish</button>
                        </div>
                    </div>
                    <Modal isOpen={modalVisible} toggle={()=>setModalVisible(false)}>
                        <ModalHeader>
                            <span className="reultNumber">Correct Answers:</span>
                        </ModalHeader>
                        <ModalBody>
                            <h1>{correctAnswers} of {quiz.length}</h1>
                            <div id="results">
                                <ul>
                                    {results.length>0 ? results.map((item,index)=>{
                                        if(item.answer==correct[item.quetionNumber-1]){
                                            return <li key={index} >
                                                <p className="correct">
                                                    <span>{item.quetionNumber} Your answer is correct </span>
                                                    {item.answer}
                                                </p>
                                            </li>
                                        }
                                        else {
                                            return <li key={index}>
                                                <p className="incorrect">
                                                    <span>Your answer for {item.quetionNumber}-question: </span>
                                                    {item.answer}
                                                </p>
                                                <p className="correct">
                                                    <span>Correct answer:</span>
                                                    {correct[item.quetionNumber-1]}
                                                </p>
                                            </li>
                                        }
                                    }) : <div> <b>Yo didn't answer any question</b> </div>}
                                </ul>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="modalFooter">
                                <button className="btn-result mx-2" onClick={showResults} type='button'>Show result</button>
                                <button className="btnClose" type="button" onClick={()=>{
                                    setVisibleForm(true)
                                    setVisibleQuestions(false)
                                }}>
                                    Close
                                </button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </>
    )
}
export default Questions