from video_backend import find_video_id, show_video
from user_profile import update_user_profile


# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
def run_recommendation_engine(user_profile):
    """
    Takes in feedback, showcases videos based on the mood and return's users profile.
    :param user_profile:
    :return:
    """
    video_id = find_video_id(user_profile)
    print(video_id)
    show_video(video_id)
    user_feedback = int(input('Select 1 for Sad. \n 2 for Neutral \n 3 for Happy.\n'))
    user_profile = update_user_profile(user_profile, user_feedback, video_id)
    print(user_profile)
    return user_profile


def random_video_suggestion():
    user_profile = {}

    video_id_list = [2,17,13]
    for video_id in video_id_list:
        print('video_id {}', video_id)
        show_video(video_id)
        user_feedback = int(input('Select 1 for Sad. \n 2 for Neutral \n 3 for Happy.\n'))
        user_profile = update_user_profile(user_profile, user_feedback, video_id)

    return user_profile


# Press the green button in the gutter to run the script.
if __name__ == '__main__':

    # TEST FOR DIFFERENT OUTPUTS
    # 2-->3 , 17-->1, 13 -->1 # Ideal output --> ASMR. Works!
    # 2-->1 , 17-->3, 13 -->1 # Ideal output --> Exercise 3. Works
    # 2-->1 , 17-->1, 13 -->3 # Ideal output --> Comedy 10. Works!

    # user_profile = random_video_suggestion()
    user_profile = {3:3}
    run_recommendation_engine(user_profile)
