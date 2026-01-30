import { FeatureFlagModel } from "../model/featureFlageModel";

class FeatureFlagService {
  private static cache: Record<string, any> = {};

  static async isDisabled(featureKey: string): Promise<boolean> {
    // In-memory cache (fast)
    if (this.cache[featureKey]) {
      return this.cache[featureKey].is_disabled;
    }

    const feature = await FeatureFlagModel.findByKey(featureKey);

    if (!feature) return false;

    this.cache[featureKey] = feature;

    return feature.is_disabled;
  }

  static async refreshCache() {
    this.cache = {};
  }

  static async toggleFeature(
    featureKey: string,
    isDisabled: boolean,
    reason: string,
    adminId:string,

  ) {
    await FeatureFlagModel.updateFeature(featureKey, isDisabled, reason, adminId);
    await this.refreshCache();
  }
}

export default FeatureFlagService;
