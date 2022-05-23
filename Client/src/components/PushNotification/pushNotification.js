import axios from 'axios';

export const newNotification = async (value,loc) => {
    try {
        const res = await axios.post(`/api/notification/new`,{
            value:value,
            location:loc, 
        })
    }
    catch(err) {
      console.log("Error pushing notification",err);
    }
};