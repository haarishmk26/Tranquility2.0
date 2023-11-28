//works test case
// Test Case: The test checks if an element with the ID myVideo (assuming this is the ID of your video player in the HTML) is present in the document. If the element is found, it means the HTML is loaded and the video player is rendered correctly.
//Running the Test: Run this test with npm test. It should pass if the video-player.html file contains an element with the ID myVideo.
const fs = require('fs');
const path = require('path');

describe('Video Player', () => {
  beforeEach(() => {
    // Load the HTML content into jsdom
    const html = fs.readFileSync(path.resolve(__dirname, 'video-player.html'), 'utf8');
    document.body.innerHTML = html;
  });

  it('should render the video player element', () => {
    // Assuming your video player has an ID of 'myVideo'
    const videoPlayer = document.getElementById('myVideo');
    expect(videoPlayer).not.toBeNull();
  });
});
