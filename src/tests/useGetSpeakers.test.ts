

import { getSpeakers, useGetSpeakers } from '../hooks/useGetSpeakers';
import { Speaker } from '../models/Speakers';

describe('getSpeakers (Real API)', () => {
  //Increase timeout for test
  jest.setTimeout(10000); // 10 seconds timeout

  test('should return an array of speakers from the real API', async () => {
    // Act
    const result: Speaker[] = await getSpeakers();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('speaker_uuid');
      expect(result[0]).toHaveProperty('styles');
      expect(result[0]).toHaveProperty('version');
      expect(result[0]).toHaveProperty('supported_features');
    }
  })
});