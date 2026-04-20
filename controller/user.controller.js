const apiConnect = require("../services/user.services")
const axios = require('axios')


const userData = async(req, res)=>{
    const {name} = req.query;

    if(!name || name===" "){
        return res.status(401).json({
            "status":"error",
            "message":"Name is required!"
        });
    //console.log(name);
    }
    const url1 = `https://api.genderize.io?name=${encodeURIComponent(name.trim())}`;
    const url2 = `https://api.agify.io?name=${encodeURIComponent(name.trim())}`;
    const url3 = `https://api.nationalize.io?name=${encodeURIComponent(name.trim())}`;
    
    try{
        const user1 = await axios.get(url1);
        const user2 = await axios.get(url2);
        const user3 = await axios.get(url3);
        
        console.log("Genderize Data: ", (user1.data))
        console.log("Agify Data: ", (user2.data))
        console.log("Nationalize Data: ", (user3.data.country))

        const probabilities = user3.data.country.map(c => c.probability);
        const countryIds = user3.data.country.map(c => c.country_id);//convert to array of country ids
        highestProbability = Math.max(...probabilities);//get maximum probability from the array of probabilities

        //get the index of the highest probability    
        let count = -1;
        probabilities.forEach(high => {
            if (high === highestProbability){
                count += 1;
                return count;
            }
        })
        
        console.log("HighestProbability: ", highestProbability);
        console.log("Country Name: ", countryIds[count]);//return the country name with the highest probability
        
        
        return res.json(user1.data);
        // if(!user.name || user.name===" " ){
        //     return res.status(400).json({"status":"error", "message":"Missing or empty name"});
        // }


        // console.log(user.date)


    }catch(err){
        console.log(err)
    }
}

module.exports = userData