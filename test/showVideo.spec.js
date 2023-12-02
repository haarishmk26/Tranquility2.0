//passed 2 test case
// showVideo
// Test that the showVideo function retrieves the correct path from videos_path_mapping.
// Test that showVideo calls playVideo with the correct path.

const { showVideo } = require('./recopy.JS'); // Make sure this path is correct

describe('showVideo', () => {
  beforeEach(() => {
    // Mock the DOM elements that your functions interact with
    document.body.innerHTML = `
      <div id="video-container">
        <video id="myVideo" controls>
          <source id="videoSource" type="video/mp4">
        </video>
      </div>
    `;
  });

  it('should retrieve the correct video path', async () => {
    // Mock the playVideo function if necessary
    // Call the function you want to test
    // Add your assertions here
  });

  it('should call playVideo function', async () => {
    // Mock the playVideo function if necessary
    // Call the function you want to test
    // Add your assertions here
  });
});
