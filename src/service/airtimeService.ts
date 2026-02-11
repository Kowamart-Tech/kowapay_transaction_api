import Airtime from "../model/airtimeModel";


const AirtimeService = {
    create: async (Airtimedata: any) => {
        const airtime = await Airtime.createAirtimeTransaction(Airtimedata);
        return airtime;

    },
    getUserAirtimeById: async (id:any) =>{
        const airtimeTransactions = await Airtime.getUserAirtimeById(id);
        return airtimeTransactions;
    }

}

export default AirtimeService;