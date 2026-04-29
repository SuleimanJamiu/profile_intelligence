const apiConnect = require("../services/user.services")
const axios = require('axios')
const {uuidv7} = require('uuidv7')
const Profile = require('../model/user.model');

//1. create profile
const createProfiles = async(req, res)=>{
    let {name} = req.body;
    name = name.trim().toLowerCase();
    
    id = uuidv7(); 
    if(!name || name=== " "){
        return res.status(400).json({"status":"error","message":"Missing or empty name"});
    }
    if(typeof name !== "string"){
        return res.status(422).json({"status":"error", "message":"Invalid type"});
    }
    const existingProfile = await Profile.findOne({name})

    NAME: name.toLowerCase()
    if (existingProfile) {
        return res.status(409).json({ status: "Success", 
            message: "Profile with this name already exists",
            "data": {
            "id": existingProfile.id,
            "name": existingProfile.name,
            "gender": existingProfile.gender,
            "gender_probability": existingProfile.probability,
            "sample_size": existingProfile.sample_size,
            "age": existingProfile.age,
            "age_group": existingProfile.age_group,
            "country_id": existingProfile.countryId,
            "country_probability": existingProfile.highestProbability,
            "created_at": existingProfile.created_at
    }});

    }
    const url1 = `https://api.genderize.io?name=${encodeURIComponent(name.trim())}`;
    const url2 = `https://api.agify.io?name=${encodeURIComponent(name.trim())}`;
    const url3 = `https://api.nationalize.io?name=${encodeURIComponent(name.trim())}`;

    try{

        const [userData1, userData2, userData3] = await Promise.all([
            axios.get(url1),
            axios.get(url2),
            axios.get(url3)
        ]);

        const {count, name, gender, probability} = userData1.data;
        const sample_size = count;
        const {age} = userData2.data;
        //edge cases
        const is_gender_count = gender == null || count <= 0;
        const is_age = age == null
        const is_nationalize_data = userData3.data.country.length === 0;
        if(is_gender_count || is_age || is_nationalize_data){
            return res.status(404).json({"status":"error", "message":"Do not store"});
        }

        const probabilities = userData3.data.country.map(c => c.probability);
        const countryIds = userData3.data.country.map(c => c.country_id);//convert to array of country ids
        highestProbability = Math.max(...probabilities);//get maximum probability from the array of probabilities

        //get the index of the highest probability    
        let counter = -1;
        probabilities.forEach(high => {
            if (high === highestProbability){
                counter += 1;
                return counter;
            }
        })

        //age classification
        let age_group = "senior"
        if(age<=12){
            age_group = "Child"
        }else if(age<=19){
            age_group = "teenager"
        }else if(age<=59){
                age_group = "adult"
        }else{
            age_group = "senior"
        }
        user = new Profile({_id:id, name:name, gender:gender, gender_probability:probability,
            sample_size:sample_size, age:age, age_group:age_group, country_id:countryIds[counter],
            country_probability:highestProbability.toFixed(2),created_at:new Date().toISOString()})
        await user.save();
        return res.status(201).json({"status": "success","data": {
            "id": id,
            "name": name,
            "gender": gender,
            "gender_probability": probability,
            "sample_size": sample_size,
            "age": age,
            "age_group": age_group,
            "country_id": countryIds[counter],
            "country_probability": highestProbability.toFixed(2),
            "created_at": new Date().toISOString()
            }
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({"status":"error", "message":"Upstream or server failure"});
    }
}

// 2. GET /api/profiles/{id} - profile by ID - 
const profilesById = async(req, res)=>{
    const {id} = req.params;

    try{
        const findProfile = await Profile.findById(id);
        
        if(!findProfile){
            return res.status(404).json({"status":"error", "message":"Profile not found"});
        }

        return res.status(200).json({"status":"success", "data": {
            "id": findProfile.id,
            "name": findProfile.name,
            "gender": findProfile.gender,
            "gender_probability": findProfile.probability,
            "sample_size": findProfile.sample_size,
            "age": findProfile.age,
            "age_group": findProfile.age_group,
            "country_id": findProfile.country_id,
            "country_probability": findProfile.country_probability.toFixed(2),
            "created_at": findProfile.created_at,
            } 
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({"status":"error", "message":"Upstream or server failure"});
    }
}


//all profiles - Optional case-insensitive query params: gender, country_id, age_group
const profiles = async(req, res)=>{
    const {gender, country_id, age_group} = req.query;
    
    try{
        let profiles = await Profile.find().select("_id name gender age age_group country_id");
        if(profiles.length === 0){
            return res.status(404).json({"Status":"error", "message":"Profile not found!"})
        }
        if (gender){
            profiles = profiles.filter(p=> p.gender.toLowerCase() === gender.toLowerCase())
        }
        if(country_id){
            profiles = profiles.filter(p=>p.country_id.toLowerCase() === country_id.toLowerCase())
        }
        if(age_group){
            profiles = profiles.filter(p=>p.age_group.toLowerCase() === age_group.toLowerCase());
        }
     
        return res.status(200).json({"status":"Success", "count":profiles.length, "data":profiles});

    }catch(err){
        return res.status(500).json({"status":"error", "message":"Upstream or server failure"});
    }
}


//4. DELETE /api/profiles/{id}
const deleteProfile = async(req, res)=>{
    const {id} = req.params;
    try{

        const profile = await Profile.findByIdAndDelete(id);
        if(!profile){
            return res.status(404).json({"status": "error", "message": "Profile not found"});
        }

        return res.status(204).end();

    }catch(err){
        console.log(err);
        return res.status(500).json({"status": "error", "message":"Upstream or server failure"});
    }
}





module.exports = {createProfiles, deleteProfile, profiles, profilesById}