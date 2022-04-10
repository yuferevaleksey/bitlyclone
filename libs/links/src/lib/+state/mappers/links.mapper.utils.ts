import { UserLinkData } from '@bit-clone-app/api';
import { UserLink } from '@bit-clone-app/links/lib/types/user-link.interface';

const mapUserLinks = (userLinks: UserLinkData[]): UserLink[] => {
  return userLinks.map((item) => {
    return {
      ...item,
      selected: item.linkCode === userLinks[0].linkCode,
    };
  });
};

const updateSelectedUserLink = (
  userLinks: UserLink[],
  selectedLinkCode: string
): UserLink[] => {
  return userLinks.map((item) => {
    return {
      ...item,
      selected: item.linkCode == selectedLinkCode,
    };
  });
};

export { mapUserLinks, updateSelectedUserLink };
