import logging

import cv2
from video_profile import videos_path_mapping, videos_genre_mapping


def play_video(video_path):
    # Open the video file
    cap = cv2.VideoCapture(video_path)

    # Check if the video file is opened successfully
    if not cap.isOpened():
        print("Error opening video file")
        return

    # Get the frames per second (fps) of the video
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Create a window to display the video
    cv2.namedWindow("Video", cv2.WINDOW_NORMAL)

    while True:
        # Read a frame from the video
        ret, frame = cap.read()

        # Break the loop if the video is over
        if not ret:
            break

        # Display the frame in the "Video" window
        cv2.imshow("Video", frame)

        # Wait for a short duration (calculated based on the video's fps)
        key = cv2.waitKey(int(1000 / fps)) & 0xFF

        # Break the loop if the user presses the 'q' key
        if key == ord('q'):
            break

    # Release the video capture object and close the window
    cap.release()
    cv2.destroyAllWindows()


def show_video(video_id):
    local_path = videos_path_mapping[video_id]
    print(local_path)
    play_video(local_path)
    return True


def find_video_id(user_profile):
    """
    Find a video based on the user's profile

    - If user is new, first 3 videos needs to be hardcoded
    - If user is existing, next videos need to be calculated.

    :param user_profile:
    :return:
    """


    # weighted video encoding moving rating into scored encoding
    non_watched_video_genre_mapping = {}
    if user_profile is None:
        logging.debug('User Profile is empty')
        return 0

    user_profile_weighted_dict = {}
    for key, value in user_profile.items():
        weighted_list = [element * value for element in videos_genre_mapping[key]]
        user_profile_weighted_dict[key] = weighted_list

    # normalized video encoding
    sum_normalized_list = [0, 0, 0, 0, 0, 0]
    for key, value in user_profile_weighted_dict.items():
        for index, key_inner in enumerate(value):
            sum_normalized_list[index] += key_inner

    total_sum = sum(sum_normalized_list)

    normalized_video_enc_list = [0, 0, 0, 0, 0, 0]
    for index, val in enumerate(sum_normalized_list):
        normalized_video_enc_list[index] = val / total_sum

    print("Normalized video enc list {}", normalized_video_enc_list)
    # normalized video enc list needs to multiplied to new videos_genre_mapping
    # emphasis on new videos

    highest_sum = 0
    highest_prob_index = 0

    # value shouldn't be inside the user profile
    for key, value in videos_genre_mapping.items():
        list_sum = 0
        if key not in user_profile:
            for index, key_inner in enumerate(value):
                if key_inner != 0 and normalized_video_enc_list[index] != 0:
                    list_sum += normalized_video_enc_list[index] * key_inner

            if highest_sum < list_sum:
                highest_sum = list_sum
                highest_prob_index = key
    print('{0: "Exercise", 1: "Comedy", 2: "Calming", 3: "Motivation", 4: "ASMR", 5: "Satisfaction"}')
    print("Video Genre Mapping {}", videos_genre_mapping[highest_prob_index])
    return highest_prob_index


if __name__ == "__main__":
    # Specify the path to your video file
    video_path = r"C:\Users\harpr\Videos\4K Video Downloader+\Satisfying Video With 3D Animations & Relaxing Music ( Endless ).mp4"

    # Call the function to play the video

    # play_video(video_path)  # press q to exit
    find_video_id({1: 2, 2: 3})
