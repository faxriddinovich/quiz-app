import React from "react";
import './responsive.css'
function Form({amount,setAmount,name,setName,categories,startTesting}){
    return(
        <>
            <form className="form-box">
                <div className='count'>
                    <label>Numbers of questions</label> <br/>
                    <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                </div>
                <div className='category'>
                    <label>Select category</label><br/>
                    <select value={name} onChange={(e)=>setName(e.target.value)}>
                        <option value={'anyCategory'}>Any category</option>
                        {categories.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="footer">
                    <button type="button" className="btn btn-outline-primary toStart" onClick={startTesting}>Start</button>
                </div>
            </form>
        </>
    )
}
export default Form