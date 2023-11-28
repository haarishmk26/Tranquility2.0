//test case works
// Test Case: The test iterates over each entry in videos_genre_mapping using Object.values. For each video, it uses the Array.prototype.some method to check if there is at least one genre that is not zero. The expect statement then checks if this condition is true (i.e., there is at least one non-null encoding for each video).


// Running the Test: Run this test with npm test. It should pass if each video in your mapping has at least one non-zero category.
describe('Video Genre Mapping', () => {
    const videos_genre_mapping = {
      // ... (your videos_genre_mapping object here)
    };
  
    it('should have non-null encoding for each video', () => {
      Object.values(videos_genre_mapping).forEach(genreArray => {
        // Check if at least one genre is not zero (non-null) for each video
        const hasNonNullGenre = genreArray.some(genre => genre !== 0);
        expect(hasNonNullGenre).toBeTruthy();
      });
    });
  });
  