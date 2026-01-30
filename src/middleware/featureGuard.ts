import FeatureFlagService from "../service/featureFlagService";

export const featureGuard = (featureKey: string) => {
  return async (req: any, res: any, next: any) => {
    const disabled = await FeatureFlagService.isDisabled(featureKey);

    if (disabled) {
      return res.status(403).json({
        success: false,
        message: `${featureKey} is temporarily disabled`
      });
    }

    next();
  };
};

