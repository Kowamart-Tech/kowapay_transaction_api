import FeatureFlagService from "../service/featureFlagService";
import HttpException from "../utils/httpExceptions";
import { AdminService } from "../service/adminService";

const AdminController = {
   toggleFeature : async(req: any, res: any) =>{
    
    
    const id = req.user.id;
    console.log('adminId:', id)
    if(!id){
    throw new HttpException(401, 'Unauthorized');
    }

    const verifyAdmin = await  AdminService.findById(id);
    if(!verifyAdmin){
      throw new HttpException(401, 'Unauthorized');
    }

  const { featureKey, disable, reason } = req.body;

  await FeatureFlagService.toggleFeature(featureKey, disable, reason, id);

  res.json({
    success: true,
    message: `${featureKey} updated successfully`
  });
}

};

export default AdminController;


