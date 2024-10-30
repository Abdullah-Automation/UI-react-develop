import { useEffect, useState } from 'react';

import { CollaborationsApi, ICollaborationRole } from '~/api';

export const useRoles = () => {
  const [roles, setRoles] = useState<ICollaborationRole[]>([]);

  useEffect(() => {
    const effect = async () => {
      const roles = (await CollaborationsApi.getCollaborationRoles()) || [];
      setRoles(roles);
    };

    effect();
  }, []);

  return {
    roles,
  };
};
