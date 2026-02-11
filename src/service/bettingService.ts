import Betting from "../model/bettingModel";

const BettingService = {
    create: async (Bettingdata: any) => {
        const betting = await Betting.createBettingTransaction(Bettingdata);
        return betting;

    },
    getUserBettingById: async (id:any) =>{
        const bettingTransactions = await Betting.getUserBettingById(id);
        return bettingTransactions;
    }

}

export default BettingService;