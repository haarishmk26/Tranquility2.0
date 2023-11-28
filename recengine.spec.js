// runRecommendationEngine.spec.js

// const { randomVideoSuggestion,runRecommendationEngine, getNextVideoId, showVideo, updateUserProfile } = require('./re.JS'); // Adjust the path as needed



// // Mock the showVideo function
// jest.mock('./re.JS', () => ({
//   randomVideoSuggestion: jest.fn(),
//   updateUserProfile: jest.fn(),
//   showVideo: jest.fn()
// }));

// describe('randomVideoSuggestion', () => {
//   it('should call showVideo and updateUserProfile for each video ID', () => {
//     // Define the videoIdList
//     const videoIdList = [2, 17, 13];

//     // Call the randomVideoSuggestion function
//     randomVideoSuggestion();

//     // Verify that showVideo and updateUserProfile are called for each video ID
//     expect(showVideo).toHaveBeenCalledTimes(videoIdList.length);
//     expect(updateUserProfile).toHaveBeenCalledTimes(videoIdList.length);

//     // Verify the arguments passed to updateUserProfile
//     for (let i = 0; i < videoIdList.length; i++) {
//       expect(updateUserProfile).toHaveBeenCalledWith({}, undefined, videoIdList[i]);
//     }
//   });
// });
