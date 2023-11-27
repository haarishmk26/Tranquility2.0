


def update_user_profile(user_profile, user_feedback, video_id):
    """

    :param user_profile:
    :return:
    """
    if video_id not in user_profile:
        user_profile[video_id] = user_feedback
    else:
        print('CAUTION: Video is on repeat {}', video_id)
    return user_profile
