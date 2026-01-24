import mongoose from "mongoose";

export const dbConnect = async () => {

    try {
        mongoose.connect(process.env.MONGO_URI,{
            dbName : 'mern_stack_hosp_mgmt'
        }).then(()=> console.log("DB Connected Successfully"));
    } catch (error) {
        console.error("Error in DB Connection: ", error);
    }

}