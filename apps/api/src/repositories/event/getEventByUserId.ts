import prisma from '@/prisma';

export const getEventByUserId = async (userId: number) => {
  try {
    const result = await prisma.event.findMany({
      where: { userId },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
