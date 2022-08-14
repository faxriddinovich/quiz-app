import axios from "axios";

export function getCategory(){
    return axios.get("https://opentdb.com/api_category.php")
}
export function getQuestionsArray(amount,categoryId){
    if(categoryId==='anyCategory'){
        return axios.get(`https://opentdb.com/api.php?amount=${amount}`)
    }
    else return axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${categoryId}`)
}