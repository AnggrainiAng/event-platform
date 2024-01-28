import prisma from '@/prisma';
import { IReferralPoints } from '@/types/reward.type';

export const createPointReferral = async (data: IReferralPoints) => {
  try {
    const { userId, pointEarned, expiresOn } = data;
    const result = await prisma.referralPoints.create({
      data: {
        userId,
        pointEarned,
        expiresOn,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
