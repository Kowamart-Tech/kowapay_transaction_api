import Airtime from "../model/airtimeModel";


const AirtimeService = {
    create: async (Airtimedata: any) => {
        const airtime = await Airtime.createAirtimeTransaction(Airtimedata);
        return airtime;

    },
    processAirtime: async (airtimeId: string) => {},
    verifyWithProvider: async (reference: string) => {},
    reverse: async (airtimeId: string) => {},
    getUserAirtimeById: async (id:any) =>{
        const airtimeTransactions = await Airtime.getUserAirtimeById(id);
        return airtimeTransactions;
    }

}

export default AirtimeService;