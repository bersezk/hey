import type { Profile } from '@hey/lens';
import type { FC } from 'react';

import DismissRecommendedProfile from '@components/Shared/DismissRecommendedProfile';
import UserProfile from '@components/Shared/UserProfile';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ProfileLinkSource } from '@hey/data/tracking';
import { EmptyState } from '@hey/ui';
import { Virtuoso } from 'react-virtuoso';

interface SuggestedProps {
  profiles: Profile[];
}

const Suggested: FC<SuggestedProps> = ({ profiles }) => {
  if (profiles.length === 0) {
    return (
      <EmptyState
        hideCard
        icon={<UsersIcon className="size-8" />}
        message="Nothing to suggest"
      />
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Virtuoso
        className="virtual-profile-list"
        computeItemKey={(_, profile) => profile.id}
        // remove the first 5 profiles from the list because they are already shown in the sidebar
        data={profiles.slice(5)}
        itemContent={(_, profile) => {
          return (
            <div className="flex items-center space-x-3 p-5">
              <div className="w-full">
                <UserProfile
                  profile={profile as Profile}
                  showBio
                  showFollowUnfollowButton
                  showUserPreview={false}
                  source={ProfileLinkSource.WhoToFollow}
                />
              </div>
              <DismissRecommendedProfile profile={profile as Profile} />
            </div>
          );
        }}
      />
    </div>
  );
};

export default Suggested;
