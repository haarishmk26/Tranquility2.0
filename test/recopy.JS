module.exports = { updateUserProfile, showVideo, getNextVideoId, runRecommendationEngine, randomVideoSuggestion, introduceDelay, delay };
var videos_path_mapping = {
    0: "http://localhost:8000/video/Satisfying%20Video%20With%203D%20Animations%20&%20Relaxing%20Music%20(%20Endless%20).mp4",
    1: "http://localhost:8000/video/Relaxing%20Video%20for%20Stress%20Relief%20%F0%9F%8E%B6.mp4",
    2: "http://localhost:8000/video/%23asmr%20Guess%20the%20triggers.mp4",
    3: "http://localhost:8000/video/4%20MUST%20DO%20GLUTE%20EXERCISES%20%23shorts.mp4",
    4: "http://localhost:8000/video/A%20Black%20Blush%20%F0%9F%A4%A8%20%23asmr.mp4",
    5: "http://localhost:8000/video/ASMR%20Best%20Previews%20Compilation%20for%20Tingles.mp4",
    6: "http://localhost:8000/video/Full%20ASMR%20Relaxing%20Haircut%20%F0%9F%92%88.mp4",
    7: "http://localhost:8000/video/Neuroscientist%20Do%20this%20to%20calm%20down%20instantly%20%20%20Physiological%20Sigh%20%23hubermanlab%20%23calm%20%23stress%20%23tool.mp4",
    8: "http://localhost:8000/video/Neuroscientist%20You%20Will%20Never%20Lack%20Focus%20Again!%20%20%20Andrew%20Huberman%20%23neuroscience%20%23shorts.mp4",
    9: "http://localhost:8000/video/ONE%20DAY%20AT%20A%20TIME%20-%20Motivational%20Speech.mp4",
    10: "http://localhost:8000/video/The%20end%2022%20%F0%9F%98%82%20%F0%9F%98%82%20%F0%9F%98%82%20%23viral%20%23shorts%20%23funny%20%23fails%20%23humor%20%23humorfolder.mp4",
    11: "http://localhost:8000/video/The%20RULE%20of%20100!%20%23motivation%20%23inspiration%20%23workhard.mp4",
    12: "http://localhost:8000/video/This%20motivational%20speech%20from%20ROCKY%20%F0%9F%92%AF.mp4",
    13: "http://localhost:8000/video/Unsolicited%20Dating%20Advice%20%F0%9F%8E%A4%20%40Bigalflynn%20%23standup%20%23comedy%20%23donttellcomedy%20%23relationships%20%23alecflynn.mp4",
    14: "http://localhost:8000/video/What%20do%20you%20want%20to%20squeeze%20for%20satisfaction%20%23satisfying%20%23asmr%20%23asmrsounds%20%23oddlysatisfying.mp4",
    15: "http://localhost:8000/video/Wow!%20So%20Satisfying%20%23shorts%20%23asmr%20%23oddlysatisfying%20%23satisfying%20%23relaxing%20%23tapeball.mp4",
    16: "http://localhost:8000/video/%F0%9F%94%A5Tripping%20Over%20Nothing%20Prank%20%F0%9F%A4%A3%20%23comedy%20%23funny%20%23pranks.mp4",
    17: "http://localhost:8000/video/6%20Simple%20Exercises%20to%20Lose%20Weight%20At%20Home%20%20%20No%20Equipment%20Needed.mp4",
    18: "http://localhost:8000/video/Be%20silent%20in%20these%203%20things%20%E2%9C%85%20%23inspiration%20%23motivation%20%23speech%20%23youtubeshorts%20%23shorts.mp4",
    19: "http://localhost:8000/video/Love%20Yourself%20-%20Sheryl%20Lee%20Ralph%20%23motivation%20%23shorts.mp4"
};


var videos_genre_mapping = {
    0: [0, 0, 1, 0, 0, 1],
    1: [0, 0, 1, 0, 0, 0],
    2: [0, 0, 1, 0, 1, 0],
    3: [1, 0, 0, 1, 0, 0],
    4: [0, 0, 1, 0, 1, 1],
    5: [0, 0, 0, 0, 1, 1],
    6: [0, 0, 0, 0, 0, 1],
    7: [0, 0, 1, 0, 0, 1],
    8: [0, 0, 0, 1, 0, 0],
    9: [0, 0, 0, 1, 1, 1],
    10: [0, 1, 0, 0, 0, 1],
    11: [0, 0, 0, 1, 0, 0],
    12: [1, 0, 0, 1, 0, 0],
    13: [0, 1, 0, 0, 0, 0],
    14: [0, 0, 0, 0, 1, 1],
    15: [0, 0, 1, 0, 1, 1],
    16: [0, 1, 0, 0, 0, 1],
    17: [1, 0, 0, 0, 0, 0],
    18: [0, 0, 0, 1, 0, 0],
    19: [0, 0, 0, 1, 0, 1]
};

// Function to play video
async function playVideo(videoPath) {
    return new Promise(resolve => {
        // Implement video playback logic using HTML5 video element or any other library
        document.getElementById("videoSource").src = videoPath;
        var video = document.getElementById("myVideo");

        // Listen for the 'ended' event and resolve the promise when the video finishes playing
        video.addEventListener('ended', function() {
            console.log("Video playback complete");
            resolve();
        });

        // Load and play the video
        video.load();
        video.play();
        console.log("Playing video: " + videoPath);
    });
}

// Function to show video based on video ID
async function showVideo(videoId){
    console.log("showVideo function triggered. videoId:" + videoId );
    var localPath = videos_path_mapping[videoId];
    console.log("Local path: " + localPath);

    // Wait for the playVideo function to complete (i.e., when the video finishes playing)
    await playVideo(localPath);

    return true; // Modify this based on your actual logic
}


// Function to find video ID based on user profile
function getNextVideoId(userProfile) {

    var user_profile_weighted_dict = {};
    for (var key in userProfile) {
        var value = userProfile[key];
        var weightedList = videos_genre_mapping[key].map(function (element) {
            return element * value;
        });
        user_profile_weighted_dict[key] = weightedList;
    }

    var sumNormalizedList = [0, 0, 0, 0, 0, 0];
    for (var key in user_profile_weighted_dict) {
        var value = user_profile_weighted_dict[key];
        for (var i = 0; i < value.length; i++) {
            sumNormalizedList[i] += value[i];
        }
    }

    var totalSum = sumNormalizedList.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);

    var normalizedVideoEncList = sumNormalizedList.map(function (value) {
        return value / totalSum;
    });

    console.log("JS File: normalizedVideoEncList",normalizedVideoEncList)

    var highestSum = 0;
    var highestProbIndex = 0;

    for (var videoKey in videos_path_mapping) {
        if (!(videoKey in userProfile)) {
            var videoGenre = videos_genre_mapping[videoKey];
            var listSum = 0;

            for (var i = 0; i < videoGenre.length; i++) {
                if (videoGenre[i] !== 0 && normalizedVideoEncList[i] !== 0) {
                    listSum += normalizedVideoEncList[i] * videoGenre[i];
                }
            }

            if (highestSum < listSum) {
                highestSum = listSum;
                highestProbIndex = videoKey;
            }
        }
    }

    console.log("Selected Video ID:", highestProbIndex);
    return highestProbIndex;
}

// Function to update user profile
 //function updateUserProfile(userFeedback, videoId) { Haarish made changes
function updateUserProfile(userProfile, userFeedback, videoId) {
        if (!(videoId in userProfile)) {
            userProfile[videoId] = userFeedback;
            console.log('updateUserProfile --> ', userProfile)
        } else {
            console.log("CAUTION: Video is on repeat", videoId);
        }
 }

// Function to run recommendation engine
function runRecommendationEngine(userProfile) {
    var videoId = findVideoId(userProfile);
    console.log(videoId);
    showVideo(videoId);
    var userFeedback = parseInt(prompt('Select 1 for Sad. \n 2 for Neutral \n 3 for Happy.'));
    userProfile = updateUserProfile(userProfile, userFeedback, videoId);
    console.log(userProfile);
    return userProfile;
}

// Function for random video suggestion
function randomVideoSuggestion() {
    var userProfile = {};
    var videoIdList = [2, 17, 13];

    for (var i = 0; i < videoIdList.length; i++) {
        var videoId = videoIdList[i];
        console.log('video_id: ' + videoId);
        showVideo(videoId);
        // QUESTION: How to trigger the button and make sure their output is passed
        // var userFeedback = parseInt(prompt('Select 1 for Sad. \n 2 for Neutral \n 3 for Happy.'));
        userProfile = updateUserProfile(userProfile, userFeedback, videoId);
    }
    return userProfile;
}

// Function to introduce a 5-second delay
function introduceDelay() {
    console.log("Delaying for 5 seconds...");

    setTimeout(function () {
        console.log("Delay complete. Continue with the next task.");
        // Add your logic here to execute after the delay
    }, 5000); // 5000 milliseconds (5 seconds)
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


window.onload = function () {
    console.log("Window Onload function triggered");
    playNextVideo();
}

