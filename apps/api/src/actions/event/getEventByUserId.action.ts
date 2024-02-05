import { getEventByUserId } from '@/repositories/event/getEventByUserId';

export const getEventByUserIdAction = async (userId: number) => {
  try {
    const data = await getEventByUserId(userId);
    if (!data) return { status: 404, message: 'Event is not found' };
    return {
      status: 200,
      message: 'Success Get Event by UserId',
      data,
    };
  } catch (error) {
    throw error;
  }
};
